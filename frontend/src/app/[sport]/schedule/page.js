'use client';
import { useState, useEffect } from 'react';
import SeasonSelector from '@/components/ui/SeasonSelector';

import { use } from 'react';

  params = use(params);
  const sport = params.sport.toUpperCase();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData([
        { date: '2025-10-15', away: 'Team C', home: 'Team D', time: '7:00 PM EST' },
        { date: '2025-10-16', away: 'Team A', home: 'Team B', time: '8:30 PM EST' },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.sport, year]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>{sport} Schedule</h2>
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
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.map((game, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <div>
                <div className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '8px' }}>{game.date}</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>{game.away} @ {game.home}</div>
              </div>
              <div style={{ alignSelf: 'center', fontWeight: '600' }}>
                {game.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
