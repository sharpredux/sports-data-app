import './globals.css';

export const metadata = {
  title: 'Sports Data Analytics',
  description: 'Premium sports data, visuals, algorithms, and predictions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav style={navStyle}>
          <div style={logoStyle}>SportsData.io</div>
          <div style={navLinksStyle}>
            <a href="/nfl">NFL</a>
            <a href="/nba">NBA</a>
            <a href="/cfb">CFB</a>
            <a href="/mlb">MLB</a>
            <a href="/mbb">MBB</a>
          </div>
        </nav>
        <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  background: 'var(--surface)',
  borderBottom: '1px solid var(--border)',
};

const logoStyle = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '1.25rem',
  fontWeight: '700',
  color: 'var(--text-primary)',
};

const navLinksStyle = {
  display: 'flex',
  gap: '16px',
  fontWeight: '500',
};
