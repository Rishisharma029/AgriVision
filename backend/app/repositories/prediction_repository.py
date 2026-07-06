from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func
from .base import CRUDBase
from ..models.prediction import Prediction
from ..models.performance import PerformanceLog
from ..models.disease import Disease
from ..models.crop import Crop
from ..schemas.prediction import PredictionCreate

class CRUDPrediction(CRUDBase[Prediction, PredictionCreate, PredictionCreate]):
    def get_by_request_id(self, db: Session, request_id: str) -> Optional[Prediction]:
        """Fetch prediction matching request ID."""
        return db.query(self.model).filter(self.model.request_id == request_id).first()

    def get_history(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Prediction]:
        """Fetch prediction history sorted by descending timestamp."""
        return (
            db.query(self.model)
            .order_by(self.model.timestamp.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_analytics_summary(self, db: Session) -> Dict[str, Any]:
        """Calculate numerical averages and distributions for the dashboard page."""
        total_scans = db.query(func.count(self.model.id)).scalar() or 0
        healthy_count = db.query(func.count(self.model.id)).filter(self.model.healthy == True).scalar() or 0
        diseased_count = db.query(func.count(self.model.id)).filter(self.model.healthy == False).scalar() or 0
        
        avg_confidence = db.query(func.avg(self.model.confidence)).scalar()
        avg_confidence = float(avg_confidence) if avg_confidence is not None else 0.0

        # Disease Distribution
        disease_counts = (
            db.query(Disease.condition, func.count(self.model.id))
            .join(self.model)
            .group_by(Disease.condition)
            .all()
        )
        disease_dist = [{"name": r[0], "value": r[1]} for r in disease_counts]

        # Crop Distribution
        crop_counts = (
            db.query(Crop.name, func.count(self.model.id))
            .join(Disease, Disease.crop_id == Crop.id)
            .join(self.model, self.model.disease_id == Disease.id)
            .group_by(Crop.name)
            .all()
        )
        crop_dist = [{"name": r[0], "value": r[1]} for r in crop_counts]

        return {
            "total_scans": total_scans,
            "healthy_count": healthy_count,
            "diseased_count": diseased_count,
            "average_confidence": avg_confidence,
            "disease_distribution": disease_dist,
            "crop_distribution": crop_dist
        }

prediction_repository = CRUDPrediction(Prediction)
