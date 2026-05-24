'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SportLayout({ children, params }) {
  const sport = params.sport.toLowerCase();
  const pathname = usePathname();

  const links = [
    { label: 'Home', path: `/${sport}` },
    { label: 'Standings', path: `/${sport}/standings` },
    { label: 'Schedule', path: `/${sport}/schedule` },
    { label: 'Teams', path: `/${sport}/teams` },
    { label: 'Predictions', path: `/${sport}/predictions` },
    { label: 'Trends', path: `/${sport}/trends` },
  ];

  if (['cfb', 'mbb'].includes(sport)) {
    links.push({ label: 'Rankings', path: `/${sport}/rankings` });
    links.push({ label: 'Recruiting', path: `/${sport}/recruiting` });
  }

  return (
    <div style={{ paddingBottom: '48px' }}>
      <div style={sportNavStyle}>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 8px' }}>
          {links.map(link => {
            const isActive = pathname === link.path;
            return (
              <Link href={link.path} key={link.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '8px 16px',
                  fontWeight: '600',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? `3px solid var(--${sport}-primary, var(--accent))` : '3px solid transparent',
                  whiteSpace: 'nowrap'
                }}>
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div style={{ marginTop: '24px' }}>
        {children}
      </div>
    </div>
  );
}

const sportNavStyle = {
  borderBottom: '1px solid var(--border)',
  margin: '0 -24px',
  padding: '0 24px',
};
