import torch.nn as nn
from .metadata import ModelMetadata
from .loader import ModelLoader
from ...core.logging_config import logger_prediction

# Define the active model version metadata
ACTIVE_MODEL_METADATA = ModelMetadata(
    version="1.0.0",
    architecture="MobileNetV2 (PyTorch)",
    training_date="2026-07-06",
    dataset="PlantVillage (Augmented) + Field Samples",
    checksum="DYNAMICALLY_UPDATED",  # Verified dynamically on startup
    accuracy=0.984,
    description="Optimized lightweight MobileNetV2 with calibrated temperature scaling."
)

class ModelRegistry:
    _instance_model: nn.Module = None
    _instance_metadata: ModelMetadata = ACTIVE_MODEL_METADATA

    @classmethod
    def get_active_model(cls) -> nn.Module:
        """Singleton getter for active inference model."""
        if cls._instance_model is None:
            logger_prediction.info("Registry initializing model load...")
            cls._instance_model = ModelLoader.load_model(cls._instance_metadata)
        return cls._instance_model

    @classmethod
    def get_active_metadata(cls) -> ModelMetadata:
        """Returns the metadata of the active model."""
        # Ensure model is initialized to update dynamic checksum if needed
        if cls._instance_model is None:
            cls.get_active_model()
        return cls._instance_metadata
