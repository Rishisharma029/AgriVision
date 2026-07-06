import time
import hashlib
import threading
from typing import Dict, Any, Optional
from ..core.settings import settings
from ..core.logging_config import logger_api

class PredictionCache:
    _lock = threading.Lock()
    # Cache format: { image_hash: { "timestamp": float, "data": dict } }
    _store: Dict[str, Dict[str, Any]] = {}

    @classmethod
    def generate_hash(cls, file_bytes: bytes) -> str:
        """Generate a unique SHA256 hash for image contents."""
        return hashlib.sha256(file_bytes).hexdigest()

    @classmethod
    def get(cls, image_hash: str) -> Optional[Dict[str, Any]]:
        """Retrieves cached result if it exists and hasn't expired."""
        with cls._lock:
            cached_item = cls._store.get(image_hash)
            if cached_item is None:
                return None
                
            elapsed = time.time() - cached_item["timestamp"]
            if elapsed > settings.CACHE_EXPIRY_SECONDS:
                # Clean up expired entry
                del cls._store[image_hash]
                logger_api.info(f"Cache expired for hash: {image_hash}")
                return None
                
            logger_api.info(f"Cache hit for hash: {image_hash} (elapsed={elapsed:.1f}s)")
            return cached_item["data"]

    @classmethod
    def set(cls, image_hash: str, response_data: Dict[str, Any]):
        """Caches a prediction response payload with a current timestamp."""
        with cls._lock:
            cls._store[image_hash] = {
                "timestamp": time.time(),
                "data": response_data
            }
            logger_api.info(f"Cached prediction entry. Active cache size: {len(cls._store)}")
            
            # Prune cache size if too large (keep under 500 records)
            if len(cls._store) > 500:
                cls._prune_oldest()

    @classmethod
    def _prune_oldest(cls):
        """Helper to evict the oldest cache entry when size limits are exceeded."""
        oldest_key = None
        oldest_time = float("inf")
        for key, value in cls._store.items():
            if value["timestamp"] < oldest_time:
                oldest_time = value["timestamp"]
                oldest_key = key
        if oldest_key:
            del cls._store[oldest_key]
            logger_api.info(f"Cache size limit reached. Evicted oldest entry: {oldest_key}")
            
    @classmethod
    def clear(cls):
        """Flush the entire cache."""
        with cls._lock:
            cls._store.clear()
            logger_api.info("Cache flushed successfully.")
