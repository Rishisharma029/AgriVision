import torch
import torch.nn.functional as F
import numpy as np
from typing import Tuple, Dict, Any
from ..core.settings import settings
from ..core.constants import CROP_DISEASES
from ..core.logging_config import logger_prediction
from ..ai.registry.registry import ModelRegistry

class InferenceService:
    @classmethod
    def predict(cls, tensor: torch.Tensor) -> Tuple[int, str, str, float, Dict[str, float]]:
        """
        Executes model inference, applies temperature scaling calibration,
        and returns the class index, crop type, disease condition, confidence,
        and all raw probability splits.
        """
        model = ModelRegistry.get_active_model()
        
        # Turn off gradients for pure forward pass speed
        with torch.no_grad():
            logits = model(tensor)
            
            # Apply Temperature Scaling to calibrate confidence
            scaled_logits = logits / settings.DEFAULT_TEMPERATURE
            
            # Compute probabilities
            probs = F.softmax(scaled_logits, dim=1).cpu().numpy()[0]
            
        class_idx = int(np.argmax(probs))
        confidence = float(probs[class_idx])
        
        # Map class index to crop and disease details
        matched_disease = None
        for crop, condition, idx in CROP_DISEASES:
            if idx == class_idx:
                matched_disease = (crop, condition)
                break
                
        if matched_disease is None:
            # Fallback if indices mismatch
            crop_type, disease_name = "Unknown", "Healthy"
        else:
            crop_type, disease_name = matched_disease
            
        # Compile complete list of probability scores
        probabilities = {}
        for crop, condition, idx in CROP_DISEASES:
            class_name = f"{crop}_{condition}".replace(" ", "_")
            probabilities[class_name] = float(probs[idx])
            
        logger_prediction.info(
            f"Inference complete: Class={class_idx}, Label={crop_type} ({disease_name}), "
            f"Raw Confidence={confidence:.4f} (temp={settings.DEFAULT_TEMPERATURE})"
        )
        
        return class_idx, crop_type, disease_name, confidence, probabilities
        
    @classmethod
    def get_calibrated_probabilities(cls, logits: torch.Tensor, temperature: float) -> np.ndarray:
        """Helper to get calibrated probabilities from raw logits tensor."""
        scaled_logits = logits / temperature
        probs = F.softmax(scaled_logits, dim=1).cpu().numpy()[0]
        return probs
