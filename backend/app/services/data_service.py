import json
from typing import Any, Dict, List, Optional
from app.services.cache import cache
from app.models.sport_enums import SportType

class DataService:
    def __init__(self):
        pass

    def _get_module(self, sport: SportType):
        pass

    def get_schedule(self, sport: SportType, year: int) -> List[Dict[str, Any]]:
        cache_key = f"{sport.value}_schedule_{year}"
        cached = cache.get(cache_key, 15 * 60)
        if cached:
            return cached
            
        sport_map = {
            SportType.NFL: ("football", "nfl"),
            SportType.NBA: ("basketball", "nba"),
            SportType.CFB: ("football", "college-football"),
            SportType.MBB: ("basketball", "mens-college-basketball")
        }
        
        if sport not in sport_map:
            return []
            
        import requests
        s_group, s_name = sport_map[sport]
        # ESPN API URL for scoreboard/schedule
        url = f"https://site.api.espn.com/apis/site/v2/sports/{s_group}/{s_name}/scoreboard?dates={year}&limit=2000"
        
        try:
            resp = requests.get(url, timeout=10)
            data = resp.json()
            events = data.get("events", [])
            cache.set(cache_key, events)
            return events
        except Exception as e:
            print(f"Error fetching schedule for {sport.value}: {e}")
            return []

    def get_scoreboard(self, sport: SportType) -> List[Dict[str, Any]]:
        cache_key = f"{sport.value}_scoreboard"
        cached = cache.get(cache_key, 60)
        if cached:
            return cached
            
        sport_map = {
            SportType.NFL: ("football", "nfl"),
            SportType.NBA: ("basketball", "nba"),
            SportType.CFB: ("football", "college-football"),
            SportType.MBB: ("basketball", "mens-college-basketball")
        }
        
        if sport not in sport_map:
            return []
            
        import requests
        from datetime import datetime, timedelta
        s_group, s_name = sport_map[sport]
        
        start_date = (datetime.now() - timedelta(days=14)).strftime("%Y%m%d")
        end_date = (datetime.now() + timedelta(days=7)).strftime("%Y%m%d")
        url = f"https://site.api.espn.com/apis/site/v2/sports/{s_group}/{s_name}/scoreboard?dates={start_date}-{end_date}&limit=100"
        
        try:
            resp = requests.get(url, timeout=10)
            data = resp.json()
            events = data.get("events", [])
            cache.set(cache_key, events)
            return events
        except Exception as e:
            print(f"Error fetching live scoreboard for {sport.value}: {e}")
            return []

data_service = DataService()
