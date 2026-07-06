import time
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from ...database.session import get_db
from ...repositories.prediction_repository import prediction_repository

router = APIRouter(prefix="/history", tags=["history"])

@router.post("/sync")
def sync_local_history(history_items: List[Dict[str, Any]], db: Session = Depends(get_db)):
    """Syncs browser IndexedDB scans to the backend SQLite database."""
    synced = 0
    for item in history_items:
        req_id = item.get("request_id") or item.get("id")
        if not req_id:
            continue
            
        existing = prediction_repository.get_by_request_id(db, str(req_id))
        if existing:
            continue
            
        # Extract fields
        crop_name = item.get("crop")
        condition = item.get("condition")
        confidence = item.get("confidence") or 0.0
        healthy = item.get("healthy") or False
        timestamp = item.get("timestamp") or time.time()
        
        from ...models.crop import Crop
        from ...models.disease import Disease
        from ...models.model_version import ModelVersion
        from ...models.prediction import Prediction
        from ...models.performance import PerformanceLog
        
        try:
            db_crop = db.query(Crop).filter(Crop.name == crop_name).first()
            if not db_crop:
                db_crop = Crop(name=crop_name, scientific_name="Unknown")
                db.add(db_crop)
                db.flush()
                
            db_disease = db.query(Disease).filter(Disease.crop_id == db_crop.id, Disease.condition == condition).first()
            if not db_disease:
                db_disease = Disease(
                    crop_id=db_crop.id, 
                    condition=condition, 
                    severity="Medium" if not healthy else "None",
                    prevention="No preventative steps detailed."
                )
                db.add(db_disease)
                db.flush()
                
            db_model = db.query(ModelVersion).filter(ModelVersion.active == True).first()
            if not db_model:
                db_model = ModelVersion(
                    version="1.0.0", 
                    architecture="MobileNetV2 (PyTorch)", 
                    training_date="2026-07-06", 
                    dataset="PlantVillage", 
                    checksum="e0d4949a2a90400d", 
                    active=True
                )
                db.add(db_model)
                db.flush()
                
            db_prediction = Prediction(
                request_id=str(req_id),
                disease_id=db_disease.id,
                model_version_id=db_model.id,
                confidence=confidence,
                healthy=healthy,
                timestamp=timestamp
            )
            db.add(db_prediction)
            db.flush()
            
            perf = item.get("performance", {})
            db_perf = PerformanceLog(
                prediction_id=db_prediction.id,
                upload_ms=perf.get("upload_ms", 0.0),
                inference_ms=perf.get("inference_ms", 0.0),
                gradcam_ms=perf.get("gradcam_ms", 0.0),
                total_ms=perf.get("total_ms", 0.0)
            )
            db.add(db_perf)
            db.commit()
            synced += 1
        except Exception:
            db.rollback()
            continue
            
    return {"status": "success", "synced_count": synced}

@router.get("")
def get_prediction_history(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """Returns predictions logged in the SQLite backend database."""
    predictions = prediction_repository.get_history(db, skip=skip, limit=limit)
    formatted = []
    for p in predictions:
        formatted.append({
            "id": p.id,
            "request_id": p.request_id,
            "crop": p.disease.crop.name,
            "condition": p.disease.condition,
            "confidence": p.confidence,
            "healthy": p.healthy,
            "timestamp": p.timestamp,
            "performance": {
                "upload_ms": p.performance_log.upload_ms if p.performance_log else 0.0,
                "inference_ms": p.performance_log.inference_ms if p.performance_log else 0.0,
                "gradcam_ms": p.performance_log.gradcam_ms if p.performance_log else 0.0,
                "total_ms": p.performance_log.total_ms if p.performance_log else 0.0
            }
        })
    return formatted
