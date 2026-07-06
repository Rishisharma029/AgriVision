from sqlalchemy.orm import Session
from ..models.crop import Crop
from ..models.disease import Disease
from ..models.treatment import Treatment
from ..models.model_version import ModelVersion
from .knowledge.static_data import CROP_PROFILES, DISEASE_PROFILES, TREATMENT_PROFILES, RECOMMENDATION_PROFILES

def get_scientific_name(crop: str) -> str:
    names = {
        "Apple": "Malus domestica",
        "Potato": "Solanum tuberosum",
        "Tomato": "Solanum lycopersicum",
        "Grape": "Vitis vinifera",
        "Corn": "Zea mays",
        "Rice": "Oryza sativa"
    }
    return names.get(crop, "Unknown")

def seed_database(db: Session) -> None:
    """Seeds the database with standard crop, disease, treatment, and model metrics on startup."""
    # Check if database is already seeded
    if db.query(Crop).count() > 0:
        return
        
    print("Database is empty. Initiating seeding sequence...")
    
    # 1. Seed Crop Profiles
    crop_instances = {}
    for crop_name, profile in CROP_PROFILES.items():
        crop = Crop(
            name=crop_name,
            scientific_name=get_scientific_name(crop_name),
            description=profile["description"],
            soil=profile["soil"],
            growing_temp=profile["growing_temp"],
            seasonal_care=profile["seasonal_care"]
        )
        db.add(crop)
        db.flush()  # Populates crop.id
        crop_instances[crop_name] = crop
        
    # 2. Seed Disease Profiles
    disease_instances = {}
    for (crop_name, disease_name), profile in DISEASE_PROFILES.items():
        crop = crop_instances.get(crop_name)
        if not crop:
            continue
            
        disease = Disease(
            crop_id=crop.id,
            condition=disease_name,
            symptoms=profile.get("symptoms", "No symptom descriptions available."),
            causes=profile.get("causes", "N/A"),
            spread=profile.get("spread", "N/A"),
            severity=profile.get("severity", "Medium" if disease_name != "Healthy" else "None"),
            prevention=profile.get("prevention", "No preventative steps detailed.")
        )
        db.add(disease)
        db.flush()  # Populates disease.id
        disease_instances[(crop_name, disease_name)] = disease
        
    # 3. Seed Treatments & Recommendations
    for (crop_name, disease_name), profile in TREATMENT_PROFILES.items():
        disease = disease_instances.get((crop_name, disease_name))
        if not disease:
            continue
            
        # Add Organic Treatments
        for desc in profile.get("organic", []):
            t = Treatment(
                disease_id=disease.id,
                treatment_type="organic",
                description=desc
            )
            db.add(t)
            
        # Add Chemical Treatments
        for desc in profile.get("chemical", []):
            t = Treatment(
                disease_id=disease.id,
                treatment_type="chemical",
                description=desc
            )
            db.add(t)
            
        # Add Fertilizer, Moisture, and Action items from Recommendation Profiles
        rec_profile = RECOMMENDATION_PROFILES.get((crop_name, disease_name))
        if rec_profile:
            if rec_profile.get("fertilizer"):
                t = Treatment(
                    disease_id=disease.id,
                    treatment_type="fertilizer",
                    description=rec_profile["fertilizer"]
                )
                db.add(t)
                
            if rec_profile.get("soil_moisture"):
                t = Treatment(
                    disease_id=disease.id,
                    treatment_type="soil_moisture",
                    description=rec_profile["soil_moisture"]
                )
                db.add(t)
                
            for action in rec_profile.get("action_items", []):
                t = Treatment(
                    disease_id=disease.id,
                    treatment_type="action_item",
                    description=action
                )
                db.add(t)
                
    # 4. Seed Active Model Version
    active_model = ModelVersion(
        version="1.0.0",
        architecture="MobileNetV2 (PyTorch)",
        training_date="2026-07-06",
        dataset="PlantVillage (54,305 images, 38 classes)",
        checksum="e0d4949a2a90400d",
        accuracy=0.982,
        active=True
    )
    db.add(active_model)
    
    db.commit()
    print("Database seeding completed successfully!")
