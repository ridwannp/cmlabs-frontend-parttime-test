'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isDiscover = pathname === '/discover';
  const isRoot = pathname === '/ingredients';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDiscover) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: scrolled
          ? 'rgba(255, 179, 0, 0.95)' /* Yellow background */
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(87, 14, 26, 0.2)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      {/* Back / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 3vw, 16px)' }}>
        <AnimatePresence mode="wait">
          {!isRoot && (
            <motion.button
              key="back"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => router.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: scrolled ? 'var(--color-base)' : 'var(--color-text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                padding: '6px 0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? '#FFF' : 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? 'var(--color-base)' : 'var(--color-text-secondary)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </motion.button>
          )}
        </AnimatePresence>

        <Link
          href="/ingredients"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '2px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 4vw, 22px)',
              fontWeight: 500,
              color: scrolled ? '#FFFFFF' : 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              transition: 'color 0.3s',
            }}
          >
            Ingredient
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 4vw, 22px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: scrolled ? 'var(--color-base)' : 'var(--color-accent)',
              transition: 'color 0.3s',
            }}
          >
            Lens
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <NavLink href="/ingredients" active={isRoot} scrolled={scrolled}>Pantry</NavLink>
        <NavLink href="/discover" accent scrolled={scrolled}>Discover</NavLink>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, children, active, accent, scrolled }) {
  // Determine default text color based on scrolled state and active state
  let defaultColor;
  if (scrolled) {
    if (accent) {
      defaultColor = 'var(--color-base)'; // Red for accent button
    } else {
      defaultColor = active ? 'var(--color-base)' : 'rgba(87, 14, 26, 0.6)'; // Red for active, semi-transparent red for inactive
    }
  } else {
    if (accent) {
      defaultColor = 'var(--color-accent)';
    } else {
      defaultColor = active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)';
    }
  }

  // Border and Background for accent button
  const border = accent 
    ? (scrolled ? '1px solid rgba(87, 14, 26, 0.3)' : '1px solid rgba(255, 179, 0, 0.3)')
    : '1px solid transparent';
  const bg = accent
    ? (scrolled ? 'rgba(87, 14, 26, 0.08)' : 'rgba(255, 179, 0, 0.08)')
    : 'transparent';

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 500,
          color: defaultColor,
          padding: '6px 14px',
          borderRadius: '99px',
          border: border,
          background: bg,
          transition: 'all 0.2s',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={(e) => {
          if (!accent) {
            e.currentTarget.style.color = scrolled ? '#FFFFFF' : 'var(--color-text-primary)';
            e.currentTarget.style.background = scrolled ? 'rgba(87, 14, 26, 0.1)' : 'rgba(255,255,255,0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!accent) {
            e.currentTarget.style.color = defaultColor;
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        {children}
      </span>
    </Link>
  );
}
