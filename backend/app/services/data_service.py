import json
from typing import Any, Dict, List, Optional
import sportsdataverse.cfb as cfb
import sportsdataverse.nfl as nfl
import sportsdataverse.nba as nba
import sportsdataverse.mbb as mbb
# Note: MLB might have limited endpoints in sportsdataverse-py. We will wrap what's available.
# We will use polars/pandas conversions if needed, but for API responses we want dictionaries.

from app.services.cache import cache
from app.models.sport_enums import SportType

class DataService:
    def __init__(self):
        # Map sports to their modules
        self.modules = {
            SportType.CFB: cfb,
            SportType.NFL: nfl,
            SportType.NBA: nba,
            SportType.MBB: mbb,
            # We'll handle MLB carefully later
        }

    def _get_module(self, sport: SportType):
        return self.modules.get(sport)

    def get_schedule(self, sport: SportType, year: int) -> List[Dict[str, Any]]:
        cache_key = f"{sport.value}_schedule_{year}"
        cached = cache.get(cache_key, 15 * 60)
        if cached:
            return cached
            
        module = self._get_module(sport)
        if not module:
            return []
            
        try:
            # Different sports might have slightly different schedule function names, 
            # usually espn_<sport>_schedule
            func = getattr(module, f"espn_{sport.value}_schedule")
            data = func(dates=year, return_as_pandas=True)
            result = data.to_dict(orient="records") if data is not None else []
            cache.set(cache_key, result)
            return result
        except Exception as e:
            print(f"Error fetching schedule for {sport.value}: {e}")
            return []

    def get_scoreboard(self, sport: SportType) -> Dict[str, Any]:
        cache_key = f"{sport.value}_scoreboard"
        cached = cache.get(cache_key, 5 * 60)
        if cached:
            return cached
            
        module = self._get_module(sport)
        if not module:
            return {}
            
        try:
            func = getattr(module, f"espn_{sport.value}_scoreboard")
            data = func()
            result = data if data else {}
            cache.set(cache_key, result)
            return result
        except Exception as e:
            print(f"Error fetching scoreboard for {sport.value}: {e}")
            return {}

data_service = DataService()
