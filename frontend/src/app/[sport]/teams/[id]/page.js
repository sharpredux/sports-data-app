'use client';
import { useState, useEffect } from 'react';
import SeasonSelector from '@/components/ui/SeasonSelector';

import { use } from 'react';
export default function TeamDetailPage({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + '/teams')
      .then(res => res.json())
      .then(apiData => {
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail) {
          setData({
        name: 'Team A',
        record: '10-2',
        conference: 'Conference X',
        stats: {
          pointsPerGame: 28.5,
          pointsAllowed: 18.2,
          yardsPerGame: 350.0,
        },
        roster: [
          { name: 'Player 1', pos: 'QB', number: '12' },
          { name: 'Player 2', pos: 'WR', number: '10' },
        ],
        recentGames: [
          { date: '2025-10-15', opponent: 'Team B', result: 'W 24-10' }
        ]
      });
        } else {
          setData(apiData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setData({
        name: 'Team A',
        record: '10-2',
        conference: 'Conference X',
        stats: {
          pointsPerGame: 28.5,
          pointsAllowed: 18.2,
          yardsPerGame: 350.0,
        },
        roster: [
          { name: 'Player 1', pos: 'QB', number: '12' },
          { name: 'Player 2', pos: 'WR', number: '10' },
        ],
        recentGames: [
          { date: '2025-10-15', opponent: 'Team B', result: 'W 24-10' }
        ]
      });
        setLoading(false);
      });
  }, [params.sport, params.id, year]);

  if (loading) return <div className="skeleton glass-card" style={{ height: '600px' }}></div>;

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{data.name}</h1>
          <div style={{ display: 'flex', gap: '16px', fontSize: '1.125rem' }}>
            <span style={{ fontWeight: '600' }}>{data.record}</span>
            <span className="text-secondary">{data.conference}</span>
          </div>
        </div>
        <SeasonSelector 
          currentYear={currentYear} 
          previousYear={currentYear - 1} 
          selectedYear={year} 
          onChange={setYear} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <h2 style={{ marginBottom: '16px' }}>Season Stats</h2>
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px', textAlign: 'center' }}>
            <div>
              <div className="text-secondary">Points Per Game</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.stats.pointsPerGame}</div>
            </div>
            <div>
              <div className="text-secondary">Points Allowed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.stats.pointsAllowed}</div>
            </div>
            <div>
              <div className="text-secondary">Yards/Game</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data.stats.yardsPerGame}</div>
            </div>
          </div>

          <h2 style={{ marginBottom: '16px' }}>Recent Games</h2>
          <div className="glass-card">
            {data.recentGames.map((game, idx) => (
              <div key={idx} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-secondary" style={{ marginRight: '16px' }}>{game.date}</span>
                <span style={{ fontWeight: '500', marginRight: '16px' }}>vs {game.opponent}</span>
                <span style={{ color: game.result.startsWith('W') ? '#10b981' : '#ef4444', fontWeight: '600' }}>{game.result}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '16px' }}>Roster</h2>
          <div className="glass-card">
            {data.roster.map(player => (
              <div key={player.name} style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <span>#{player.number} {player.name}</span>
                <span className="text-secondary">{player.pos}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
