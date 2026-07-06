import os
from typing import List

class Settings:
    PROJECT_NAME: str = "LeafSense AI"
    VERSION: str = "1.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",  # React default
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # Model Configurations
    MODEL_VERSION: str = "1.0.0"
    MODEL_ARCH: str = "MobileNetV2"
    DEFAULT_TEMPERATURE: float = 1.2  # For temperature scaling
    
    # Image constraints
    MAX_IMAGE_SIZE_BYTES: int = 5 * 1024 * 1024  # 5MB before compression
    ALLOWED_CONTENT_TYPES: List[str] = ["image/jpeg", "image/png", "image/webp"]
    
    # Logging Configurations
    LOG_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "logs")
    
    # Cache Configurations
    CACHE_EXPIRY_SECONDS: int = 3600  # 1 hour

settings = Settings()
