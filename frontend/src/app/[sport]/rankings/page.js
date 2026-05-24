'use client';
import { useState, useEffect } from 'react';

import { use } from 'react';
export default function RankingsPage({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + '/rankings')
      .then(res => res.json())
      .then(apiData => {
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail || (Array.isArray(apiData) && apiData.length === 0) || (apiData.predictions && apiData.predictions.length === 0)) {
          setRankings([
        { rank: 1, prev: 1, name: 'Team A', points: 1500, firstPlaceVotes: 60 },
        { rank: 2, prev: 3, name: 'Team B', points: 1420, firstPlaceVotes: 2 },
        { rank: 3, prev: 2, name: 'Team C', points: 1380, firstPlaceVotes: 0 },
        { rank: 4, prev: 6, name: 'Team D', points: 1200, firstPlaceVotes: 0 },
      ]);
        } else {
          setRankings(apiData.data || apiData.predictions || apiData.rankings || apiData.recruiting || apiData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setRankings([
        { rank: 1, prev: 1, name: 'Team A', points: 1500, firstPlaceVotes: 60 },
        { rank: 2, prev: 3, name: 'Team B', points: 1420, firstPlaceVotes: 2 },
        { rank: 3, prev: 2, name: 'Team C', points: 1380, firstPlaceVotes: 0 },
        { rank: 4, prev: 6, name: 'Team D', points: 1200, firstPlaceVotes: 0 },
      ]);
        setLoading(false);
      });
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
