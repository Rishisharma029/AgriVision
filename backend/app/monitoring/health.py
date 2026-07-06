import shutil
import os
import platform
import sys
from typing import Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..ai.registry.registry import ModelRegistry
from ..models.crop import Crop

class SystemHealth:
    @staticmethod
    def get_health_status(db: Session = None) -> Dict[str, Any]:
        """Gathers system, database connection status, and model diagnostics."""
        # 1. Disk Space Check
        root_dir = "/"
        if platform.system().lower() == "windows":
            root_dir = "C:\\"
        
        total, used, free = shutil.disk_usage(root_dir)
        disk_pct_used = (used / total) * 100 if total > 0 else 0
        
        # 2. Model Registry Status Check
        model_loaded = False
        model_info = {}
        try:
            metadata = ModelRegistry.get_active_metadata()
            model_loaded = ModelRegistry._instance_model is not None
            model_info = {
                "version": metadata.version,
                "architecture": metadata.architecture,
                "loaded": model_loaded
            }
        except Exception as e:
            model_info = {"error": f"Failed to retrieve model registry status: {str(e)}"}

        # 3. Database Status Check
        db_status = "offline"
        knowledge_seeded = False
        if db is not None:
            try:
                # Raw ping check
                db.execute(text("SELECT 1"))
                db_status = "online"
                
                # Check if crops have been seeded
                crop_count = db.query(Crop).count()
                knowledge_seeded = crop_count > 0
            except Exception as db_err:
                db_status = f"degraded: {str(db_err)}"

        status = "healthy"
        if not model_loaded or db_status != "online" or not knowledge_seeded:
            status = "degraded"

        return {
            "status": status,
            "database": {
                "connection": db_status,
                "knowledge_seeded": knowledge_seeded
            },
            "model_engine": model_info,
            "environment": {
                "python_version": sys.version,
                "os_platform": platform.platform(),
                "processor": platform.processor()
            },
            "disk": {
                "total_gb": round(total / (1024**3), 2),
                "free_gb": round(free / (1024**3), 2),
                "used_percent": round(disk_pct_used, 1)
            }
        }
