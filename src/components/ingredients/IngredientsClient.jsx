'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/ui/SearchBar';
import IngredientGrid from '@/components/ingredients/IngredientGrid';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function IngredientsClient({ ingredients }) {
  const [query, setQuery] = useState('');
  const [isSurprising, setIsSurprising] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const t = setTimeout(() => setShowScrollHint(true), 1200);
    const onScroll = () => {
      if (window.scrollY > 60) setShowScrollHint(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return ingredients;
    const q = debouncedQuery.toLowerCase();
    return ingredients.filter((i) =>
      i.strIngredient.toLowerCase().includes(q)
    );
  }, [ingredients, debouncedQuery]);

  const handleSurpriseMe = useCallback(async () => {
    setIsSurprising(true);
    await new Promise((r) => setTimeout(r, 420));
    router.push('/discover');
  }, [router]);

  return (
    <>
      {/* ── Controls row ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8"
      >
        <SearchBar
          id="ingredient-search"
          value={query}
          onChange={(v) => {
            setQuery(v);
            setShowScrollHint(false);
          }}
          placeholder="Search ingredients…"
        />

        <motion.button
          onClick={handleSurpriseMe}
          whileTap={{ scale: 0.95 }}
          animate={isSurprising ? { rotate: [0, -8, 8, -6, 6, 0], scale: [1, 1.05, 0.95, 1] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            height: '44px',
            padding: '0 20px',
            background: 'linear-gradient(135deg, rgba(200,169,110,0.18), rgba(200,169,110,0.08))',
            border: '1px solid rgba(200,169,110,0.4)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s, box-shadow 0.2s',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200,169,110,0.2)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(200,169,110,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,169,110,0.18), rgba(200,169,110,0.08))';
            e.currentTarget.style.boxShadow = 'none';
          }}
          aria-label="Surprise me — go to Discover mode"
        >
          <span style={{ fontSize: '16px' }}>✦</span>
          Surprise Me
        </motion.button>

        {/* Count */}
        <AnimatePresence mode="wait">
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:ml-auto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}
          >
            {filtered.length} ingredient{filtered.length !== 1 ? 's' : ''}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* ── Grid ──────────────────────────────────── */}
      <IngredientGrid ingredients={filtered} query={debouncedQuery} />

      {/* ── Scroll hint ───────────────────────────── */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
              zIndex: 50,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.7)',
              }}
            >
              Scroll to explore
            </span>
            <div className="bounce-arrow" style={{ color: 'rgba(200,169,110,0.7)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
