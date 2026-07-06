from typing import Optional
from sqlalchemy.orm import Session
from .base import CRUDBase
from ..models.model_version import ModelVersion
from ..schemas.model_version import ModelVersionCreate

class CRUDModelVersion(CRUDBase[ModelVersion, ModelVersionCreate, ModelVersionCreate]):
    def get_active(self, db: Session) -> Optional[ModelVersion]:
        """Look up the currently active model version."""
        return db.query(self.model).filter(self.model.active == True).first()

    def set_active(self, db: Session, *, version: str) -> Optional[ModelVersion]:
        """Activate a specific model version and deactivate all others."""
        # Deactivate all
        db.query(self.model).update({self.model.active: False})
        
        # Activate target
        target = db.query(self.model).filter(self.model.version == version).first()
        if target:
            target.active = True
            db.add(target)
            db.commit()
            db.refresh(target)
        return target

model_repository = CRUDModelVersion(ModelVersion)
