import os
from .settings import settings

class Paths:
    ROOT_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    APP_DIR: str = os.path.join(ROOT_DIR, "app")
    
    # Storage & Exports directories
    LOGS_DIR: str = os.path.join(ROOT_DIR, "logs")
    MODELS_DIR: str = os.path.join(ROOT_DIR, "models")
    CACHE_DIR: str = os.path.join(ROOT_DIR, "cache")
    UPLOADS_DIR: str = os.path.join(ROOT_DIR, "uploads")
    
    @classmethod
    def ensure_directories(cls):
        """Create required runtime folders if they don't exist."""
        for directory in [cls.LOGS_DIR, cls.MODELS_DIR, cls.CACHE_DIR, cls.UPLOADS_DIR]:
            os.makedirs(directory, exist_ok=True)

paths = Paths()
paths.ensure_directories()
