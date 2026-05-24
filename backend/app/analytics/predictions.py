from typing import Dict, Any

# Base weights (all sports)
BASE_WEIGHTS = {
    "rolling_form":      0.25,
    "offensive_eff":     0.20,
    "defensive_eff":     0.15,
    "home_away":         0.15,
    "head_to_head":      0.10,
    "strength_of_sched": 0.10,
    "momentum":          0.05,
}

FOOTBALL_WEIGHTS = {
    "rolling_form":      0.20,
    "epa_offense":       0.20,  
    "epa_defense":       0.15,  
    "home_away":         0.15,
    "head_to_head":      0.10,
    "strength_of_sched": 0.10,
    "momentum":          0.05,
    "wpa_clutch":        0.05,  
}

NBA_WEIGHTS = {
    "rolling_form":      0.20,
    "offensive_eff":     0.15,
    "defensive_eff":     0.12,
    "home_away":         0.12,
    "head_to_head":      0.08,
    "strength_of_sched": 0.08,
    "momentum":          0.05,
    "player_matchup":    0.20,  
}

class PredictionEngine:
    def __init__(self):
        pass
        
    def generate_prediction(self, sport: str, home_team_stats: Dict, away_team_stats: Dict) -> Dict[str, Any]:
        """
        Generate a prediction based on calculated trend stats.
        home_team_stats and away_team_stats should contain keys corresponding to the weights.
        Returns a prediction schema dict.
        """
        if sport.lower() in ['nfl', 'cfb']:
            weights = FOOTBALL_WEIGHTS
        elif sport.lower() == 'nba':
            weights = NBA_WEIGHTS
        else:
            weights = BASE_WEIGHTS
            
        home_score = 0.0
        away_score = 0.0
        
        factors = {}
        for factor, weight in weights.items():
            h_val = home_team_stats.get(factor, 50.0)
            a_val = away_team_stats.get(factor, 50.0)
            
            # For efficiency and form, higher is better
            home_score += h_val * weight
            away_score += a_val * weight
            
            factors[factor] = {
                "home": round(h_val, 1),
                "away": round(a_val, 1),
                "edge": "home" if h_val > a_val else "away"
            }
            
        # Add home field advantage bias directly to final score
        home_score += home_team_stats.get('home_advantage_bias', 2.0)
        
        total = home_score + away_score
        if total == 0:
            confidence = 50
            winner = "tie"
        else:
            home_prob = home_score / total
            away_prob = away_score / total
            if home_prob > away_prob:
                winner = "home"
                confidence = round(home_prob * 100)
            else:
                winner = "away"
                confidence = round(away_prob * 100)
                
        # Simple projection based on offensive/defensive ratings
        base_points = 100 if sport == 'nba' else 24
        home_proj = base_points * (home_team_stats.get('offensive_eff', 50)/50) * (away_team_stats.get('defensive_eff', 50)/50)
        away_proj = base_points * (away_team_stats.get('offensive_eff', 50)/50) * (home_team_stats.get('defensive_eff', 50)/50)

        return {
            "winner": winner,
            "confidence": confidence,
            "projected_score": {
                "home": f"{int(home_proj-5)}-{int(home_proj+5)}",
                "away": f"{int(away_proj-5)}-{int(away_proj+5)}"
            },
            "factors": factors,
            "insights": [
                f"Prediction engine confidence is {confidence}% for {winner}.",
            ]
        }

prediction_engine = PredictionEngine()
