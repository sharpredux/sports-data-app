'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const SPORTS = [
  { id: 'nfl', name: 'NFL', desc: 'National Football League', color: 'var(--nfl-primary)' },
  { id: 'nba', name: 'NBA', desc: 'National Basketball Association', color: 'var(--nba-primary)' },
  { id: 'cfb', name: 'College Football', desc: 'NCAA Division I FBS', color: 'var(--cfb-primary)' },
  { id: 'mlb', name: 'MLB', desc: 'Major League Baseball', color: 'var(--mlb-primary)' },
  { id: 'mbb', name: 'College Basketball', desc: 'NCAA Men\'s Division I', color: 'var(--mbb-primary)' }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load for the dashboard
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <header style={{ textAlign: 'center', margin: '48px 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Data-Driven Sports Insights
        </h1>
        <p className="text-secondary" style={{ fontSize: '1.25rem' }}>
          Advanced metrics, trends, and predictions across 5 major leagues.
        </p>
      </header>

      <section>
        <h2 style={{ marginBottom: '24px' }}>Select a League</h2>
        
        <div style={gridStyle}>
          {SPORTS.map(sport => (
            <Link href={`/${sport.id}`} key={sport.id} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ ...badgeStyle, backgroundColor: sport.color }}>{sport.id.toUpperCase()}</div>
                <h3 style={{ margin: '16px 0 8px 0', fontSize: '1.5rem' }}>{sport.name}</h3>
                <p className="text-secondary" style={{ flexGrow: 1 }}>{sport.desc}</p>
                {loading ? (
                  <div style={{ marginTop: '16px' }}>
                    <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '8px' }}></div>
                    <div className="skeleton" style={{ height: '16px', width: '80%' }}></div>
                  </div>
                ) : (
                  <div style={{ marginTop: '16px', color: 'var(--accent)', fontWeight: '500' }}>
                    View Stats & Predictions &rarr;
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
};

const badgeStyle = {
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: '700',
  width: 'fit-content',
  color: 'white',
};
