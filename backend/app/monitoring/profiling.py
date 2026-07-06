import time
from contextlib import contextmanager
from typing import Dict

@contextmanager
def profile_section(performance_tracker: Dict[str, float], key: str):
    """
    Context manager that measures execution duration in milliseconds
    and saves it to the provided dictionary under the specified key.
    """
    start_time = time.perf_counter()
    try:
        yield
    finally:
        end_time = time.perf_counter()
        duration_ms = (end_time - start_time) * 1000.0
        performance_tracker[key] = duration_ms
