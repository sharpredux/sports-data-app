'use client';
import { useState, useEffect } from 'react';
import SeasonSelector from '@/components/ui/SeasonSelector';

import { use } from 'react';
export default function StandingsPage({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch from backend in real implementation
    const timer = setTimeout(() => {
      setData({
        divisions: [
          {
            name: 'Division 1',
            teams: [
              { name: 'Team A', w: 10, l: 2, pct: 0.833, strk: 'W5' },
              { name: 'Team B', w: 8, l: 4, pct: 0.667, strk: 'L1' },
            ]
          }
        ]
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport, year]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>{sport} Standings</h2>
        <SeasonSelector 
          currentYear={currentYear} 
          previousYear={currentYear - 1} 
          selectedYear={year} 
          onChange={setYear} 
        />
      </div>

      {loading ? (
        <div className="skeleton glass-card" style={{ height: '400px' }}></div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {data.divisions.map(div => (
            <div key={div.name} className="glass-card">
              <h3 style={{ marginBottom: '16px' }}>{div.name}</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr className="text-secondary" style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '8px 0' }}>Team</th>
                    <th style={{ padding: '8px 0' }}>W</th>
                    <th style={{ padding: '8px 0' }}>L</th>
                    <th style={{ padding: '8px 0' }}>PCT</th>
                    <th style={{ padding: '8px 0' }}>STRK</th>
                  </tr>
                </thead>
                <tbody>
                  {div.teams.map(team => (
                    <tr key={team.name} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 0', fontWeight: '500' }}>{team.name}</td>
                      <td style={{ padding: '12px 0' }}>{team.w}</td>
                      <td style={{ padding: '12px 0' }}>{team.l}</td>
                      <td style={{ padding: '12px 0' }}>{team.pct.toFixed(3)}</td>
                      <td style={{ padding: '12px 0' }}>{team.strk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
