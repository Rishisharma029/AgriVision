import threading
from typing import Dict, Any

class SystemMetrics:
    _lock = threading.Lock()
    _total_predictions = 0
    _failed_predictions = 0
    _crop_counts: Dict[str, int] = {}
    _disease_counts: Dict[str, int] = {}
    _inference_times = []

    @classmethod
    def increment_predictions(cls, crop: str, condition: str):
        with cls._lock:
            cls._total_predictions += 1
            cls._crop_counts[crop] = cls._crop_counts.get(crop, 0) + 1
            cls._disease_counts[condition] = cls._disease_counts.get(condition, 0) + 1

    @classmethod
    def increment_failures(cls):
        with cls._lock:
            cls._failed_predictions += 1

    @classmethod
    def record_inference_time(cls, ms: float):
        with cls._lock:
            cls._inference_times.append(ms)
            # Keep only the last 1000 runtimes to prevent unbounded memory growth
            if len(cls._inference_times) > 1000:
                cls._inference_times.pop(0)

    @classmethod
    def get_summary(cls) -> Dict[str, Any]:
        """Compiles metric counters into a payload for monitoring dashboard."""
        with cls._lock:
            avg_inf = sum(cls._inference_times) / len(cls._inference_times) if cls._inference_times else 0.0
            return {
                "total_predictions": cls._total_predictions,
                "failed_predictions": cls._failed_predictions,
                "crop_distributions": cls._crop_counts.copy(),
                "disease_distributions": cls._disease_counts.copy(),
                "avg_inference_ms": round(avg_inf, 2)
            }
            
metrics_collector = SystemMetrics()
