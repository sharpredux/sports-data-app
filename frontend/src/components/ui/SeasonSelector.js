'use client';
import { useState } from 'react';

export default function SeasonSelector({ currentYear, previousYear, selectedYear, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', background: 'var(--surface)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <button 
        style={selectedYear === currentYear ? activeBtnStyle : btnStyle}
        onClick={() => onChange(currentYear)}
      >
        {currentYear}-{String(currentYear + 1).slice(-2)} Season
      </button>
      <button 
        style={selectedYear === previousYear ? activeBtnStyle : btnStyle}
        onClick={() => onChange(previousYear)}
      >
        {previousYear}-{String(previousYear + 1).slice(-2)} Season
      </button>
    </div>
  );
}

const btnStyle = {
  background: 'transparent',
  border: 'none',
  padding: '6px 12px',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  borderRadius: '4px',
  fontWeight: '500',
  fontSize: '0.875rem'
};

const activeBtnStyle = {
  ...btnStyle,
  background: '#333',
  color: 'var(--text-primary)',
};
