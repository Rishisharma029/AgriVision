from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ...services.knowledge.crop_service import CropService
from ...database.session import get_db

router = APIRouter(prefix="/crops", tags=["crops"])

@router.get("")
def list_crops(db: Session = Depends(get_db)):
    """Lists all crops supported by the LeafSense system."""
    return CropService.list_crops(db)

@router.get("/{crop_name}")
def get_crop(crop_name: str, db: Session = Depends(get_db)):
    """Returns growing parameters and seasonal care for a specific crop."""
    profile = CropService.get_crop_profile(db, crop_name.capitalize())
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Crop profile '{crop_name}' not found."
        )
    return profile
