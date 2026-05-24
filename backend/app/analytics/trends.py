import numpy as np
from typing import List, Dict

class TrendAlgorithms:
    @staticmethod
    def rolling_form_index(margins: List[float], decay_factor: float = 0.9) -> float:
        """
        Exponentially weighted average of last N game margins.
        margins should be ordered from oldest to newest.
        """
        if not margins:
            return 50.0
            
        weights = np.array([decay_factor ** i for i in range(len(margins) - 1, -1, -1)])
        weights = weights / weights.sum()
        
        weighted_margin = np.sum(np.array(margins) * weights)
        # Normalize arbitrarily to a 0-100 scale (assuming max margin around 30)
        score = 50 + (weighted_margin * 1.5)
        return float(np.clip(score, 0, 100))

    @staticmethod
    def momentum_score(differentials: List[float]) -> float:
        """Linear regression slope of point differentials over last N games."""
        if len(differentials) < 2:
            return 0.0
        x = np.arange(len(differentials))
        y = np.array(differentials)
        slope, _ = np.polyfit(x, y, 1)
        return float(np.clip(slope, -10, 10))

    @staticmethod
    def consistency_rating(differentials: List[float]) -> float:
        """100 - (σ of point differentials × 5)"""
        if not differentials:
            return 50.0
        std_dev = np.std(differentials)
        rating = 100 - (std_dev * 5)
        return float(np.clip(rating, 0, 100))

    @staticmethod
    def offensive_efficiency(scored_list: List[float], league_avg: float = 20.0) -> float:
        """Points scored per game, normalized to league average."""
        if not scored_list:
            return 50.0
        avg_scored = np.mean(scored_list)
        # Assuming 50 is avg, scaling based on standard typical deviation
        diff = avg_scored - league_avg
        return float(np.clip(50 + (diff * 2), 0, 100))

    @staticmethod
    def defensive_efficiency(allowed_list: List[float], league_avg: float = 20.0) -> float:
        """Points allowed per game, inverted."""
        if not allowed_list:
            return 50.0
        avg_allowed = np.mean(allowed_list)
        diff = league_avg - avg_allowed
        return float(np.clip(50 + (diff * 2), 0, 100))

    @staticmethod
    def home_away_split(home_win_pct: float, away_win_pct: float, 
                        home_margin: float, away_margin: float) -> float:
        """Measures venue dependence."""
        return float(np.clip((home_win_pct - away_win_pct) * (home_margin - away_margin), -50, 50))

    @staticmethod
    def strength_of_schedule(opponent_win_pcts: List[float], recency_weights: List[float]) -> float:
        if not opponent_win_pcts:
            return 50.0
        return float(np.average(opponent_win_pcts, weights=recency_weights))

    @staticmethod
    def streak_detector(results: List[int], margins: List[float]) -> float:
        """1 for win, -1 for loss."""
        if not results:
            return 0.0
            
        current_streak_type = results[-1]
        streak_len = 0
        streak_margins = []
        
        for res, margin in zip(reversed(results), reversed(margins)):
            if res == current_streak_type:
                streak_len += 1
                streak_margins.append(margin)
            else:
                break
                
        avg_margin = np.mean(streak_margins) if streak_margins else 0
        score = streak_len * avg_margin * current_streak_type
        return float(np.clip(score, -100, 100))

    @staticmethod
    def epa_efficiency(epa_list: List[float]) -> float:
        """Avg Expected Points Added per play."""
        if not epa_list:
            return 0.0
        return float(np.clip(np.mean(epa_list), -0.5, 0.5))

    @staticmethod
    def wpa_clutch_index(wpa_list: List[float]) -> float:
        """Avg Win Probability Added in high-leverage situations."""
        if not wpa_list:
            return 0.0
        return float(np.clip(np.mean(wpa_list), -1.0, 1.0))

trend_algorithms = TrendAlgorithms()
