import os
import json
import time
from typing import Any, Optional
from app.config import settings

class FileCache:
    def __init__(self, cache_dir: str = settings.CACHE_DIR):
        self.cache_dir = cache_dir
        os.makedirs(self.cache_dir, exist_ok=True)

    def _get_file_path(self, key: str) -> str:
        safe_key = "".join(c if c.isalnum() else "_" for c in key)
        return os.path.join(self.cache_dir, f"{safe_key}.json")

    def get(self, key: str, ttl: int) -> Optional[Any]:
        """Get an item from cache if it hasn't expired."""
        filepath = self._get_file_path(key)
        if not os.path.exists(filepath):
            return None
            
        file_mod_time = os.path.getmtime(filepath)
        if time.time() - file_mod_time > ttl:
            return None
            
        try:
            with open(filepath, "r") as f:
                return json.load(f)
        except Exception:
            return None

    def set(self, key: str, value: Any) -> bool:
        """Set an item in the cache."""
        filepath = self._get_file_path(key)
        try:
            with open(filepath, "w") as f:
                json.dump(value, f)
            return True
        except Exception:
            return False

cache = FileCache()
