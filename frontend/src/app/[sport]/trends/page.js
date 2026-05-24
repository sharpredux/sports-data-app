'use client';
import { useState, useEffect } from 'react';
import TrendLineChart from '@/components/charts/TrendLineChart';
import ScoringAreaChart from '@/components/charts/ScoringAreaChart';

import { use } from 'react';
export default function TrendsPage({ params }) {
  params = use(params);
  const sport = params.sport.toUpperCase();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/' + params.sport.toLowerCase() + '/trends')
      .then(res => res.json())
      .then(apiData => {
        if (!apiData || Object.keys(apiData).length === 0 || apiData.detail) {
          setData({
        hottest: [
          { name: 'Team A', momentum: 8.5, streak: 'W7' },
          { name: 'Team B', momentum: 7.2, streak: 'W5' },
        ],
        risers: [
          { name: 'Team C', change: '+15.2' },
          { name: 'Team D', change: '+12.4' },
        ],
        formChartData: {
          labels: ['G1', 'G2', 'G3', 'G4', 'G5'],
          values: [55, 60, 68, 85, 92]
        },
        efficiencyData: {
          labels: ['G1', 'G2', 'G3', 'G4', 'G5'],
          scored: [24, 28, 35, 42, 38],
          allowed: [14, 10, 17, 20, 14]
        }
      });
        } else {
          setData(apiData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setData({
        hottest: [
          { name: 'Team A', momentum: 8.5, streak: 'W7' },
          { name: 'Team B', momentum: 7.2, streak: 'W5' },
        ],
        risers: [
          { name: 'Team C', change: '+15.2' },
          { name: 'Team D', change: '+12.4' },
        ],
        formChartData: {
          labels: ['G1', 'G2', 'G3', 'G4', 'G5'],
          values: [55, 60, 68, 85, 92]
        },
        efficiencyData: {
          labels: ['G1', 'G2', 'G3', 'G4', 'G5'],
          scored: [24, 28, 35, 42, 38],
          allowed: [14, 10, 17, 20, 14]
        }
      });
        setLoading(false);
      });
  }, [params.sport]);

  if (loading) return <div className="skeleton glass-card" style={{ height: '600px' }}></div>;

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>{sport} Trends Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>🔥 Hottest Teams</h3>
          {data.hottest.map(t => (
            <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontWeight: '500' }}>{t.name}</span>
              <span>
                <span className="text-secondary" style={{ marginRight: '16px' }}>Momentum: {t.momentum}</span>
                <span style={{ color: '#10b981', fontWeight: '700' }}>{t.streak}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>📈 Biggest Risers</h3>
          {data.risers.map(t => (
            <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontWeight: '500' }}>{t.name}</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>League Leading Form</h3>
          <TrendLineChart data={data.formChartData} color="#3b82f6" />
        </div>
        
        <div className="glass-card">
          <h3 style={{ marginBottom: '16px' }}>Top Offense Efficiency</h3>
          <ScoringAreaChart 
            labels={data.efficiencyData.labels} 
            scored={data.efficiencyData.scored} 
            allowed={data.efficiencyData.allowed} 
          />
        </div>
      </div>
    </div>
  );
}
