'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CinematicCard from './CinematicCard';
import { getRandomMealsBatch } from '@/lib/api';

const BATCH_SIZE = 5;

/**
 * @param {{ initialMeals: Array }} props
 */
export default function DiscoverFeed({ initialMeals }) {
  const [meals, setMeals] = useState(initialMeals);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const feedRef = useRef(null);

  // Load more meals from client
  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newMeals = await getRandomMealsBatch(BATCH_SIZE);
      // Deduplicate
      setMeals((prev) => {
        const ids = new Set(prev.map((m) => m.idMeal));
        return [...prev, ...newMeals.filter((m) => !ids.has(m.idMeal))];
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Track scroll position → update currentIndex and load more
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const handleScroll = () => {
      const scrollTop = feed.scrollTop;
      const slideH = feed.clientHeight;
      const idx = Math.round(scrollTop / slideH);
      setCurrentIndex(idx);

      if (idx > 0) setShowHint(false);

      // Load more when 3 slides from end (earlier trigger)
      if (idx >= meals.length - 3) loadMore();
    };

    feed.addEventListener('scroll', handleScroll, { passive: true });
    return () => feed.removeEventListener('scroll', handleScroll);
  }, [meals.length, loadMore]);

  return (
    <div style={{ position: 'relative', height: '100dvh', background: '#570E1A' }}>
      {/* ── Minimal top bar ─────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'linear-gradient(to bottom, rgba(31, 21, 16, 0.7), transparent)',
        }}
      >
        <Link
          href="/ingredients"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </Link>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          Discover
        </span>

        {/* Meal counter */}
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(meals.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Progress dots ────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        {meals.slice(0, 10).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex % 10 ? '6px' : '4px',
              height: i === currentIndex % 10 ? '24px' : '4px',
              borderRadius: '99px',
              background: i === currentIndex % 10 ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => {
              const feed = feedRef.current;
              if (feed) feed.scrollTo({ top: i * feed.clientHeight, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* ── Scroll Feed ─────────────────────────────── */}
      <div ref={feedRef} className="discover-feed">
        {meals.map((meal, i) => (
          <CinematicCard key={`${meal.idMeal}-${i}`} meal={meal} index={i} />
        ))}

        {/* Loading slide */}
        {loading && (
          <div
            className="discover-slide"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
              background: '#1F1510',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid rgba(243,156,18,0.2)',
                borderTopColor: 'var(--color-accent)',
              }}
            />
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'rgba(255,255,255,0.4)' }}>
              Loading more…
            </p>
          </div>
        )}
      </div>

      {/* ── Scroll hint ─────────────────────────────── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200,169,110,0.25)',
                borderRadius: '99px',
                padding: '8px 16px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="bounce-arrow" style={{ display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
              Scroll to explore
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.05em',
              }}
            >
              Swipe right to save · Swipe left to skip
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
