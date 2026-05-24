'use client';
import { useState, useEffect } from 'react';

export default function RecruitingPage({ params }) {
  const sport = params.sport.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setClasses([
        { rank: 1, name: 'Team A', rating: 315.4, fiveStars: 4, fourStars: 15, commits: 24 },
        { rank: 2, name: 'Team B', rating: 302.1, fiveStars: 3, fourStars: 16, commits: 22 },
        { rank: 3, name: 'Team C', rating: 288.5, fiveStars: 1, fourStars: 18, commits: 25 },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport]);

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>{sport} Recruiting Class Rankings</h2>

      {loading ? (
        <div className="skeleton glass-card" style={{ height: '400px' }}></div>
      ) : (
        <div className="glass-card">
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-secondary" style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '8px 0' }}>Rank</th>
                <th style={{ padding: '8px 0' }}>Team</th>
                <th style={{ padding: '8px 0' }}>Total Rating</th>
                <th style={{ padding: '8px 0', textAlign: 'center' }}>5★</th>
                <th style={{ padding: '8px 0', textAlign: 'center' }}>4★</th>
                <th style={{ padding: '8px 0', textAlign: 'center' }}>Total Commits</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(team => (
                <tr key={team.name} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 0', fontWeight: '600' }}>{team.rank}</td>
                  <td style={{ padding: '12px 0', fontWeight: '500' }}>{team.name}</td>
                  <td style={{ padding: '12px 0', fontWeight: '600', color: 'var(--accent)' }}>{team.rating}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>{team.fiveStars}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>{team.fourStars}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>{team.commits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
