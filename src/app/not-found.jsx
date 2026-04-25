import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
        gap: '24px',
      }}
    >
      {/* Display number */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(96px, 18vw, 200px)',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: 'var(--color-border)',
          lineHeight: 1,
          margin: 0,
          userSelect: 'none',
        }}
      >
        404
      </p>

      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px',
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            margin: 0,
            maxWidth: '360px',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link
        href="/ingredients"
        style={{
          height: '48px',
          padding: '0 28px',
          background: 'var(--color-accent)',
          color: '#0A0A0B',
          borderRadius: '99px',
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        ← Back to Pantry
      </Link>
    </div>
  );
}
