from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...database.session import get_db
from ...repositories.disease_repository import disease_repository

router = APIRouter(prefix="/diseases", tags=["diseases"])

@router.get("")
def list_diseases(db: Session = Depends(get_db)):
    """Lists all diseases registered in the database knowledge base."""
    db_diseases = disease_repository.get_multi(db, limit=200)
    formatted = []
    for d in db_diseases:
        organic = [t.description for t in d.treatments if t.treatment_type == "organic"]
        chemical = [t.description for t in d.treatments if t.treatment_type == "chemical"]
        formatted.append({
            "crop": d.crop.name,
            "condition": d.condition,
            "symptoms": d.symptoms,
            "causes": d.causes,
            "severity": d.severity,
            "prevention": d.prevention,
            "organic_treatments": organic,
            "chemical_treatments": chemical
        })
    return formatted
