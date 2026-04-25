/**
 * @param {{ cols?: number, count?: number, height?: number }} props
 */
export function LoadingGrid({ cols = 4, count = 12, height = 180 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '16px',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shimmer"
          style={{
            height: `${height}px`,
            borderRadius: 'var(--radius-md)',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Horizontal skeleton for ingredient list items
 */
export function LoadingList({ count = 8 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shimmer"
          style={{
            height: '72px',
            borderRadius: 'var(--radius-md)',
            opacity: 1 - i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Hero skeleton for meal detail page
 */
export function LoadingHero() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="shimmer" style={{ height: '460px', borderRadius: 'var(--radius-lg)' }} />
      <div className="shimmer" style={{ height: '56px', width: '60%', borderRadius: 'var(--radius-sm)' }} />
      <div className="shimmer" style={{ height: '24px', width: '40%', borderRadius: 'var(--radius-sm)' }} />
    </div>
  );
}
