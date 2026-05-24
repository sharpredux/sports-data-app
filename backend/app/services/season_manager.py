import datetime

# Rough season definitions
SPORT_SEASONS = {
    "nfl": {"start_month": 9, "end_month": 2},
    "nba": {"start_month": 10, "end_month": 6},
    "cfb": {"start_month": 8, "end_month": 1},
    "mlb": {"start_month": 3, "end_month": 11},
    "mbb": {"start_month": 11, "end_month": 4},
}

class SeasonManager:
    @staticmethod
    def get_current_season(sport: str, current_date: datetime.date = None) -> int:
        if current_date is None:
            current_date = datetime.date.today()
            
        year = current_date.year
        month = current_date.month
        
        season_info = SPORT_SEASONS.get(sport.lower())
        if not season_info:
            return year
            
        start_month = season_info["start_month"]
        
        # If sport starts late in the year and ends next year (e.g. NBA, NFL)
        if start_month > 6:
            # If we are in Jan-end_month, the season is year-1
            if month < start_month:
                return year - 1
            else:
                return year
        else:
            # MLB, etc.
            return year

    @staticmethod
    def is_in_season(sport: str, current_date: datetime.date = None) -> bool:
        if current_date is None:
            current_date = datetime.date.today()
            
        month = current_date.month
        season_info = SPORT_SEASONS.get(sport.lower())
        if not season_info:
            return True
            
        start = season_info["start_month"]
        end = season_info["end_month"]
        
        if start <= end:
            return start <= month <= end
        else:
            return month >= start or month <= end

    @staticmethod
    def get_season_years(sport: str) -> list[int]:
        """Return the last 2 seasons."""
        current_season = SeasonManager.get_current_season(sport)
        return [current_season, current_season - 1]

season_manager = SeasonManager()
