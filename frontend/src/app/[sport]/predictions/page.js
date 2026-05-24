'use client';
import { useState, useEffect } from 'react';

import { use } from 'react';

  params = use(params);
  const sport = params.sport.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setPredictions([
        {
          id: 1,
          date: 'Tonight, 8:00 PM',
          home: { name: 'Team A', record: '22-5' },
          away: { name: 'Team B', record: '18-9' },
          prediction: {
            winner: 'home',
            confidence: 68,
            projectedScore: '115 - 108',
            insights: [
              '🔥 Team A is on a 7-game win streak',
              '📊 Team A ranks #2 in defensive efficiency',
              sport === 'NBA' ? '🏀 Matchup advantage: Team A backcourt' : '🏈 EPA Advantage: Team A Offense'
            ]
          }
        }
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>{sport} Predictions</h2>
        <div className="glass-card" style={{ padding: '8px 16px' }}>
          <span className="text-secondary">Model Accuracy: </span>
          <span style={{ color: '#10b981', fontWeight: '700' }}>64.2%</span>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: '24px' }}>
          <div className="skeleton glass-card" style={{ height: '300px' }}></div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {predictions.map(game => (
            <div key={game.id} className="glass-card">
              <div className="text-secondary" style={{ marginBottom: '16px', textAlign: 'center' }}>{game.date}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', color: game.prediction.winner === 'away' ? 'var(--accent)' : 'inherit' }}>{game.away.name}</h3>
                  <div className="text-secondary">{game.away.record}</div>
                </div>
                
                <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '16px 32px', borderRadius: '12px' }}>
                  <div className="text-secondary" style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Projected</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', margin: '4px 0' }}>{game.prediction.projectedScore}</div>
                  <div style={{ color: game.prediction.confidence > 65 ? '#10b981' : '#f59e0b', fontWeight: '600' }}>
                    {game.prediction.confidence}% Confidence
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.5rem', color: game.prediction.winner === 'home' ? 'var(--accent)' : 'inherit' }}>{game.home.name}</h3>
                  <div className="text-secondary">{game.home.record}</div>
                </div>
              </div>

              <div style={{ background: '#1a1a1a', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>Key Factors</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {game.prediction.insights.map((insight, idx) => (
                    <li key={idx} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
