from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
from ...database.session import get_db
from ...repositories.prediction_repository import prediction_repository

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
def get_synced_analytics_summary(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Query database metrics to compile aggregate counts and charts.
    """
    summary = prediction_repository.get_analytics_summary(db)
    return summary
