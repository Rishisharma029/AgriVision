from typing import Optional
from sqlalchemy.orm import Session
from .base import CRUDBase
from ..models.disease import Disease
from ..models.crop import Crop
from ..schemas.disease import DiseaseCreate

# Using CropCreate as a temporary type for update
class CRUDDisease(CRUDBase[Disease, DiseaseCreate, DiseaseCreate]):
    def get_by_condition_and_crop(self, db: Session, *, crop_name: str, condition_name: str) -> Optional[Disease]:
        """Look up a disease by matching condition name and associated crop name."""
        return (
            db.query(self.model)
            .join(Crop)
            .filter(Crop.name == crop_name, self.model.condition == condition_name)
            .first()
        )

disease_repository = CRUDDisease(Disease)
