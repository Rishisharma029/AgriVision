import io
import torch
import torchvision.transforms as T
from PIL import Image
from ..validators.image import ImageValidator
from ..exceptions.prediction import InvalidImageException

class ImageService:
    # Standard transforms for MobileNetV2 backbone (ImageNet statistics)
    _transforms = T.Compose([
        T.Resize((224, 224)),
        T.ToTensor(),
        T.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    @classmethod
    def process_image(cls, file_bytes: bytes) -> torch.Tensor:
        """
        Runs the full verification pipeline (Magic bytes, PIL verification, Leaf heuristics),
        decodes it, resizes it, normalizes it, and returns a 4D batch tensor.
        """
        # 1. Magic bytes validation
        ImageValidator.validate_magic_bytes(file_bytes)
        
        # 2. Pillow integrity check
        ImageValidator.verify_image_integrity(file_bytes)
        
        # 3. Leaf Heuristics check (Green/Yellow HSV ratio)
        ImageValidator.detect_leaf_heuristic(file_bytes)
        
        try:
            # Load as RGB PIL Image
            img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
            
            # Apply torchvision transforms and append batch dimension
            tensor = cls._transforms(img).unsqueeze(0)  # Shape: [1, 3, 224, 224]
            return tensor
        except Exception as e:
            raise InvalidImageException(f"Failed to prepare image tensor: {str(e)}")

    @classmethod
    def load_for_gradcam(cls, file_bytes: bytes) -> Image.Image:
        """Helper to load image as PIL Image in RGB mode for Grad-CAM overlay."""
        return Image.open(io.BytesIO(file_bytes)).convert("RGB")
