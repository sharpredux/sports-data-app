'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { use } from 'react';
export default function LeagueHome({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation we would fetch from `/api/v1/${params.sport}/dashboard`
    const timer = setTimeout(() => {
      setData({
        recentGames: [
          { id: 1, home: 'Team A', away: 'Team B', homeScore: 104, awayScore: 98, status: 'Final' },
          { id: 2, home: 'Team C', away: 'Team D', homeScore: 112, awayScore: 120, status: 'Final' },
        ],
        topTeams: [
          { name: 'Team C', record: '12-3' },
          { name: 'Team A', record: '11-4' },
        ]
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>{sport} Overview</h1>
        {/* We will add SeasonSelector here later */}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <h2 style={{ marginBottom: '16px' }}>Recent Games</h2>
          {loading ? (
            <div className="skeleton glass-card" style={{ height: '200px' }}></div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {data.recentGames.map(game => (
                <Link href={`/${params.sport}/games/${game.id}`} key={game.id}>
                  <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: game.homeScore > game.awayScore ? '700' : '500' }}>
                        {game.home} {game.homeScore}
                      </div>
                      <div style={{ fontWeight: game.awayScore > game.homeScore ? '700' : '500', marginTop: '8px' }}>
                        {game.away} {game.awayScore}
                      </div>
                    </div>
                    <div className="text-secondary" style={{ fontSize: '0.875rem' }}>{game.status}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 style={{ marginBottom: '16px' }}>Top Teams</h2>
          {loading ? (
            <div className="skeleton glass-card" style={{ height: '200px' }}></div>
          ) : (
            <div className="glass-card">
              {data.topTeams.map((team, idx) => (
                <div key={team.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: idx < data.topTeams.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontWeight: '600' }}>{idx + 1}. {team.name}</span>
                  <span className="text-secondary">{team.record}</span>
                </div>
              ))}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link href={`/${params.sport}/standings`} style={{ color: `var(--${params.sport.toLowerCase()}-primary, var(--accent))` }}>
                  Full Standings &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
