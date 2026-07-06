from typing import Optional
from sqlalchemy.orm import Session
from .base import CRUDBase
from ..models.crop import Crop
from ..schemas.crop import CropCreate, CropUpdate

class CRUDCrop(CRUDBase[Crop, CropCreate, CropUpdate]):
    def get_by_name(self, db: Session, name: str) -> Optional[Crop]:
        """Look up a crop by name."""
        return db.query(self.model).filter(self.model.name == name).first()

crop_repository = CRUDCrop(Crop)
