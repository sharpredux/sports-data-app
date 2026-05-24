'use client';
import { useState, useEffect } from 'react';

export default function RankingsPage({ params }) {
  const sport = params.sport.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setRankings([
        { rank: 1, prev: 1, name: 'Team A', points: 1500, firstPlaceVotes: 60 },
        { rank: 2, prev: 3, name: 'Team B', points: 1420, firstPlaceVotes: 2 },
        { rank: 3, prev: 2, name: 'Team C', points: 1380, firstPlaceVotes: 0 },
        { rank: 4, prev: 6, name: 'Team D', points: 1200, firstPlaceVotes: 0 },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport]);

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>{sport} AP Top 25</h2>

      {loading ? (
        <div className="skeleton glass-card" style={{ height: '400px' }}></div>
      ) : (
        <div className="glass-card">
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-secondary" style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '8px 0' }}>Rank</th>
                <th style={{ padding: '8px 0' }}>Team</th>
                <th style={{ padding: '8px 0' }}>Points (1st)</th>
                <th style={{ padding: '8px 0', textAlign: 'right' }}>Movement</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map(team => {
                const diff = team.prev - team.rank;
                return (
                  <tr key={team.name} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 0', fontWeight: '600' }}>{team.rank}</td>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>{team.name}</td>
                    <td style={{ padding: '12px 0' }}>{team.points} {team.firstPlaceVotes > 0 && <span className="text-secondary">({team.firstPlaceVotes})</span>}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600', color: diff > 0 ? '#10b981' : (diff < 0 ? '#ef4444' : 'inherit') }}>
                      {diff > 0 ? `▲ ${diff}` : (diff < 0 ? `▼ ${Math.abs(diff)}` : '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
