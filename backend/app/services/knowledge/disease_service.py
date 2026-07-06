from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from ...repositories.disease_repository import disease_repository

class DiseaseService:
    @staticmethod
    def get_disease_profile(db: Session, crop: str, disease: str) -> Optional[Dict[str, Any]]:
        """Query disease parameters from the database via DiseaseRepository."""
        db_disease = disease_repository.get_by_condition_and_crop(db, crop_name=crop, condition_name=disease)
        if not db_disease:
            return None
        return {
            "symptoms": db_disease.symptoms,
            "causes": db_disease.causes,
            "spread": db_disease.spread,
            "severity": db_disease.severity,
            "prevention": db_disease.prevention
        }
