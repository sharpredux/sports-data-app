'use client';
import { useState, useEffect } from 'react';

export default function GameDetailPage({ params }) {
  const sport = params.sport.toUpperCase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData({
        date: '2025-10-15',
        status: 'Final',
        home: { name: 'Team A', score: 24, quarters: [7, 10, 0, 7] },
        away: { name: 'Team B', score: 10, quarters: [0, 3, 7, 0] },
        boxScore: [
          { player: 'Player 1', pts: 12, ast: 4, reb: 3 },
          { player: 'Player 2', pts: 8, ast: 1, reb: 10 },
        ],
        pbp: [
          { time: '1Q 12:00', text: 'Game started' },
          { time: '1Q 08:30', text: 'Team A Touchdown' },
        ]
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport, params.id]);

  if (loading) return <div className="skeleton glass-card" style={{ height: '600px' }}></div>;

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div className="text-secondary" style={{ marginBottom: '16px' }}>{data.date} • {data.status}</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>{data.away.name}</h2>
            <div style={{ fontSize: '3rem', fontWeight: '700' }}>{data.away.score}</div>
          </div>
          <div className="text-secondary" style={{ fontSize: '1.25rem' }}>@</div>
          <div>
            <h2 style={{ fontSize: '2rem' }}>{data.home.name}</h2>
            <div style={{ fontSize: '3rem', fontWeight: '700' }}>{data.home.score}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <h2 style={{ marginBottom: '16px' }}>Box Score Highlights</h2>
          <div className="glass-card">
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr className="text-secondary" style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '8px 0' }}>Player</th>
                  <th style={{ padding: '8px 0' }}>PTS</th>
                  <th style={{ padding: '8px 0' }}>AST</th>
                  <th style={{ padding: '8px 0' }}>REB</th>
                </tr>
              </thead>
              <tbody>
                {data.boxScore.map(stat => (
                  <tr key={stat.player} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 0' }}>{stat.player}</td>
                    <td style={{ padding: '8px 0' }}>{stat.pts}</td>
                    <td style={{ padding: '8px 0' }}>{stat.ast}</td>
                    <td style={{ padding: '8px 0' }}>{stat.reb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '16px' }}>Play by Play</h2>
          <div className="glass-card">
            {data.pbp.map((play, idx) => (
              <div key={idx} style={{ padding: '8px 0', borderBottom: idx < data.pbp.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: '16px' }}>
                <span className="text-secondary" style={{ minWidth: '80px' }}>{play.time}</span>
                <span>{play.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
