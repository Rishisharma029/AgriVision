import time
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from ..cache.memory import PredictionCache
from ..monitoring.profiling import profile_section
from ..monitoring.metrics import metrics_collector
from ..core.logging_config import logger_prediction, logger_error
from ..services.image_service import ImageService
from ..services.inference_service import InferenceService
from ..services.gradcam_service import GradCAMService
from ..services.knowledge.disease_service import DiseaseService
from ..services.knowledge.treatment_service import TreatmentService
from ..services.knowledge.recommendation_service import RecommendationService
from ..builders.response_builder import ResponseBuilder
from ..ai.registry.registry import ModelRegistry
from ..repositories.model_repository import model_repository
from ..repositories.disease_repository import disease_repository

class PredictionService:
    @classmethod
    def execute_pipeline(cls, db: Session, file_bytes: bytes, request_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Coordinates end-to-end prediction and persists telemetry to SQLite.
        """
        # 1. Hashing and Cache lookup
        image_hash = PredictionCache.generate_hash(file_bytes)
        cached_response = PredictionCache.get(image_hash)
        if cached_response is not None:
            # Update the cached response request_id if a custom one is supplied
            if request_id:
                cached_response["request_id"] = request_id
            return cached_response

        # Track execution times for performance telemetry
        performance = {}
        total_start = time.perf_counter()

        try:
            # 2. Image Processing & Heuristic Validation
            with profile_section(performance, "upload_ms"):
                # Reads file, asserts magic bytes, verifies with Pillow, and runs HSV foliage checks
                tensor = ImageService.process_image(file_bytes)
                original_image = ImageService.load_for_gradcam(file_bytes)

            # 3. Model Inference & Temperature Calibration
            with profile_section(performance, "inference_ms"):
                class_idx, crop, condition, confidence, _ = InferenceService.predict(tensor)

            # 4. Grad-CAM Explainable AI Heatmap
            with profile_section(performance, "gradcam_ms"):
                model = ModelRegistry.get_active_model()
                gradcam_base64 = GradCAMService.generate_heatmap(
                    model=model,
                    input_tensor=tensor,
                    class_idx=class_idx,
                    original_image=original_image
                )

            # Record total duration
            total_end = time.perf_counter()
            performance["total_ms"] = (total_end - total_start) * 1000.0

            # 5. Metadata and Treatment lookup via DB Session
            disease_info = DiseaseService.get_disease_profile(db, crop, condition) or {}
            treatment_info = TreatmentService.get_treatments(db, crop, condition) or {}
            recommendation_info = RecommendationService.get_recommendations(db, crop, condition) or {}
            model_metadata = ModelRegistry.get_active_metadata()

            # Update metrics
            metrics_collector.increment_predictions(crop, condition)
            metrics_collector.record_inference_time(performance["inference_ms"])

            # 6. Response Assembly
            response_data = ResponseBuilder.build_prediction_response(
                model_metadata=model_metadata,
                class_index=class_idx,
                crop=crop,
                condition=condition,
                confidence=confidence,
                gradcam_base64=gradcam_base64,
                disease_info=disease_info,
                treatment_info=treatment_info,
                recommendation_info=recommendation_info,
                performance_metrics=performance,
                request_id=request_id
            )

            # 7. Database Persistence
            try:
                # Resolve active model version
                db_model = model_repository.get_active(db)
                if not db_model:
                    # Fallback to creating one if not exists (fail-safe)
                    from ..models.model_version import ModelVersion
                    db_model = ModelVersion(
                        version=model_metadata.version,
                        architecture=model_metadata.architecture,
                        training_date=model_metadata.training_date,
                        dataset=model_metadata.dataset,
                        checksum=model_metadata.checksum,
                        active=True
                    )
                    db.add(db_model)
                    db.flush()

                # Resolve disease condition
                db_disease = disease_repository.get_by_condition_and_crop(db, crop_name=crop, condition_name=condition)
                if not db_disease:
                    # Fallback if database seed is missing (fail-safe)
                    from ..models.disease import Disease
                    from ..models.crop import Crop
                    db_crop = db.query(Crop).filter(Crop.name == crop).first()
                    if not db_crop:
                        db_crop = Crop(name=crop, scientific_name="Unknown")
                        db.add(db_crop)
                        db.flush()
                    db_disease = Disease(
                        crop_id=db_crop.id, 
                        condition=condition, 
                        severity="Medium" if condition != "Healthy" else "None",
                        prevention="No preventative steps detailed."
                    )
                    db.add(db_disease)
                    db.flush()

                # Write Prediction record
                from ..models.prediction import Prediction
                is_healthy = condition.lower() == "healthy"
                db_prediction = Prediction(
                    request_id=response_data["request_id"],
                    disease_id=db_disease.id,
                    model_version_id=db_model.id,
                    confidence=confidence,
                    healthy=is_healthy,
                    timestamp=time.time()
                )
                db.add(db_prediction)
                db.flush()

                # Write Performance log record
                from ..models.performance import PerformanceLog
                db_perf = PerformanceLog(
                    prediction_id=db_prediction.id,
                    upload_ms=performance.get("upload_ms", 0.0),
                    inference_ms=performance.get("inference_ms", 0.0),
                    gradcam_ms=performance.get("gradcam_ms", 0.0),
                    total_ms=performance.get("total_ms", 0.0)
                )
                db.add(db_perf)
                db.commit()
            except Exception as db_err:
                db.rollback()
                logger_error.error(f"Database write failed during prediction: {str(db_err)}")

            # Save in cache
            PredictionCache.set(image_hash, response_data)

            # Log prediction event
            logger_prediction.info(f"Successful diagnostic pipeline run. Crop={crop}, Condition={condition}, Confidence={confidence:.2%}")
            return response_data

        except Exception as e:
            metrics_collector.increment_failures()
            logger_error.error(f"Inference pipeline execution error: {str(e)}")
            raise e
