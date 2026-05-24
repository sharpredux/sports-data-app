'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { use } from 'react';
export default function TeamsPage({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + '/teams')
      .then(res => res.json())
      .then(apiData => {
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail) {
          setData([
        { id: '1', name: 'Team A', location: 'City A', abbreviation: 'TA', color: '#ff0000' },
        { id: '2', name: 'Team B', location: 'City B', abbreviation: 'TB', color: '#00ff00' },
        { id: '3', name: 'Team C', location: 'City C', abbreviation: 'TC', color: '#0000ff' },
      ]);
        } else {
          setData(apiData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setData([
        { id: '1', name: 'Team A', location: 'City A', abbreviation: 'TA', color: '#ff0000' },
        { id: '2', name: 'Team B', location: 'City B', abbreviation: 'TB', color: '#00ff00' },
        { id: '3', name: 'Team C', location: 'City C', abbreviation: 'TC', color: '#0000ff' },
      ]);
        setLoading(false);
      });
  }, [params.sport]);

  const filteredTeams = data?.filter(team => team.name.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>{sport} Teams</h2>
        <input 
          type="text" 
          placeholder="Search teams..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
        />
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton glass-card" style={{ height: '120px' }}></div>)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filteredTeams.map(team => (
            <Link href={`/${params.sport}/teams/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: team.color, margin: '0 auto 12px auto' }}></div>
                <h3 style={{ fontSize: '1.125rem' }}>{team.name}</h3>
                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>{team.location}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
