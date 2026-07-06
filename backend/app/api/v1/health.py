from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...monitoring.health import SystemHealth
from ...monitoring.metrics import metrics_collector
from ...database.session import get_db

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/status")
def get_system_status(db: Session = Depends(get_db)):
    """Returns platform diagnostic details, database connections, and model indicators."""
    return SystemHealth.get_health_status(db)

@router.get("/metrics")
def get_system_metrics():
    """Returns prediction and failure counters along with execution averages."""
    return metrics_collector.get_summary()
