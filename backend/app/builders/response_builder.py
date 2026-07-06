import uuid
from typing import Dict, Any, Optional
from ..ai.registry.metadata import ModelMetadata

class ResponseBuilder:
    @staticmethod
    def build_prediction_response(
        model_metadata: ModelMetadata,
        class_index: int,
        crop: str,
        condition: str,
        confidence: float,
        gradcam_base64: str,
        disease_info: Dict[str, Any],
        treatment_info: Dict[str, Any],
        recommendation_info: Dict[str, Any],
        performance_metrics: Dict[str, float],
        request_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Assembles all prediction steps into the standard, unified response payload contract.
        """
        if request_id is None:
            request_id = str(uuid.uuid4())

        is_healthy = condition.lower() == "healthy"

        # Safe defaults if metadata is missing
        rec_section = {
            "symptoms": disease_info.get("symptoms", "No symptom descriptions available."),
            "causes": disease_info.get("causes", "N/A"),
            "spread": disease_info.get("spread", "N/A"),
            "severity": disease_info.get("severity", "None"),
            "prevention": disease_info.get("prevention", "No preventative steps detailed."),
            "organic_treatments": treatment_info.get("organic", []) if treatment_info else [],
            "chemical_treatments": treatment_info.get("chemical", []) if treatment_info else [],
            "fertilizer": recommendation_info.get("fertilizer", "No specific fertilizer recommendation.") if recommendation_info else "N/A",
            "soil_moisture": recommendation_info.get("soil_moisture", "No specific moisture recommendation.") if recommendation_info else "N/A",
            "action_items": recommendation_info.get("action_items", []) if recommendation_info else []
        }

        # Formulate core prediction data
        payload_data = {
            "model": {
                "version": model_metadata.version,
                "architecture": model_metadata.architecture,
                "training_date": model_metadata.training_date,
                "dataset": model_metadata.dataset,
                "checksum": model_metadata.checksum
            },
            "prediction": {
                "class_index": class_index,
                "crop": crop,
                "condition": condition,
                "confidence": round(confidence, 4),
                "healthy": is_healthy
            },
            "gradcam": {
                "heatmap_image": gradcam_base64
            },
            "recommendation": rec_section
        }

        # Wrap in the production API envelope
        response = {
            "request_id": request_id,
            "version": "1.0",
            "success": True,
            "data": payload_data,
            "metadata": {},
            "performance": {
                "upload_ms": round(performance_metrics.get("upload_ms", 0.0), 2),
                "inference_ms": round(performance_metrics.get("inference_ms", 0.0), 2),
                "gradcam_ms": round(performance_metrics.get("gradcam_ms", 0.0), 2),
                "total_ms": round(performance_metrics.get("total_ms", 0.0), 2)
            }
        }
        return response
