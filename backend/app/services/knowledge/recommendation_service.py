from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from ...repositories.disease_repository import disease_repository

class RecommendationService:
    @staticmethod
    def get_recommendations(db: Session, crop: str, disease: str) -> Optional[Dict[str, Any]]:
        """Query soil, fertilizer, and action item parameters from the database."""
        db_disease = disease_repository.get_by_condition_and_crop(db, crop_name=crop, condition_name=disease)
        if not db_disease:
            return None
            
        fertilizer = "No specific fertilizer recommendation."
        soil_moisture = "No specific moisture recommendation."
        action_items = []
        
        for t in db_disease.treatments:
            if t.treatment_type == "fertilizer":
                fertilizer = t.description
            elif t.treatment_type == "soil_moisture":
                soil_moisture = t.description
            elif t.treatment_type == "action_item":
                action_items.append(t.description)
                
        return {
            "fertilizer": fertilizer,
            "soil_moisture": soil_moisture,
            "action_items": action_items
        }
