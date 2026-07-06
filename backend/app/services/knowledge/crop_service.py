from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from ...repositories.crop_repository import crop_repository

class CropService:
    @staticmethod
    def get_crop_profile(db: Session, crop: str) -> Optional[Dict[str, Any]]:
        """Query crop parameters from the database via CropRepository."""
        db_crop = crop_repository.get_by_name(db, crop)
        if not db_crop:
            return None
        return {
            "description": db_crop.description,
            "soil": db_crop.soil,
            "growing_temp": db_crop.growing_temp,
            "seasonal_care": db_crop.seasonal_care
        }

    @staticmethod
    def list_crops(db: Session) -> Dict[str, Dict[str, Any]]:
        """Query all crops in the database."""
        db_crops = crop_repository.get_multi(db, limit=100)
        return {
            c.name: {
                "description": c.description,
                "soil": c.soil,
                "growing_temp": c.growing_temp,
                "seasonal_care": c.seasonal_care
            }
            for c in db_crops
        }
