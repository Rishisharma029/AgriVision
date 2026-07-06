from sqlalchemy.orm import Session
from typing import Dict, List, Optional
from ...repositories.disease_repository import disease_repository

class TreatmentService:
    @staticmethod
    def get_treatments(db: Session, crop: str, disease: str) -> Optional[Dict[str, List[str]]]:
        """Query organic and chemical treatments from the database."""
        db_disease = disease_repository.get_by_condition_and_crop(db, crop_name=crop, condition_name=disease)
        if not db_disease:
            return None
            
        organic = [t.description for t in db_disease.treatments if t.treatment_type == "organic"]
        chemical = [t.description for t in db_disease.treatments if t.treatment_type == "chemical"]
        
        return {
            "organic": organic,
            "chemical": chemical
        }
