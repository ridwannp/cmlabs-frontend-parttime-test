'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { getRandomMeal } from '@/lib/api';

export default function RandomMealGenerator() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const fetchRandom = useCallback(async () => {
    setShuffling(true);
    setMeal(null);
    await new Promise((r) => setTimeout(r, 350));
    setShuffling(false);
    setLoading(true);

    try {
      const data = await getRandomMeal();
      setMeal(data);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(24px, 5vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(255, 179, 0, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '12px',
          }}
        >
          Feeling indecisive?
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          I don&apos;t know<br />
          <em style={{ color: 'var(--color-accent)' }}>what to cook</em>
        </h2>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          onClick={fetchRandom}
          whileTap={{ scale: 0.95 }}
          animate={shuffling ? {
            rotate: [0, -10, 10, -8, 8, -4, 4, 0],
            scale: [1, 1.05, 0.98, 1],
          } : {}}
          transition={{ duration: 0.4 }}
          disabled={loading || shuffling}
          style={{
            height: '52px',
            padding: '0 28px',
            background: 'linear-gradient(135deg, #FFB300, #E65100)',
            border: 'none',
            borderRadius: '99px',
            color: '#5D1A1A',
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading || shuffling ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: loading || shuffling ? 0.8 : 1,
            transition: 'opacity 0.2s, box-shadow 0.2s',
            letterSpacing: '0.01em',
            boxShadow: '0 4px 20px rgba(243,156,18,0.25)',
          }}
          onMouseEnter={(e) => { if (!loading && !shuffling) e.currentTarget.style.boxShadow = '0 8px 32px rgba(243,156,18,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(243,156,18,0.25)'; }}
          aria-label="Surprise me with a random meal"
        >
          <motion.span
            animate={shuffling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-flex' }}
          >
            ✦
          </motion.span>
          {loading ? 'Finding meal…' : shuffling ? 'Shuffling…' : 'Surprise Me'}
        </motion.button>

        <Link href="/discover" style={{ textDecoration: 'none' }}>
          <span
            style={{
              height: '52px',
              padding: '0 24px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '99px',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-hover)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Browse Discover
          </span>
        </Link>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {(loading || shuffling) && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', gap: '6px' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }}
              />
            ))}
          </motion.div>
        )}

        {meal && !loading && !shuffling && (
          <motion.div
            key={meal.idMeal}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width: '100%',
              maxWidth: '360px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="360px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '20px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px',
                  lineHeight: 1.2,
                }}
              >
                {meal.strMeal}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 16px' }}>
                {meal.strCategory} · {meal.strArea}
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/meals/${meal.idMeal}`} style={{ flex: 1, textDecoration: 'none' }}>
                  <span
                    style={{
                      width: '100%',
                      height: '40px',
                      background: 'var(--color-accent)',
                      color: '#5D1A1A',
                      borderRadius: '99px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 600,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Cook This
                  </span>
                </Link>
                <button
                  onClick={fetchRandom}
                  style={{
                    height: '40px',
                    padding: '0 16px',
                    background: 'transparent',
                    border: '1px solid var(--color-border)',
                    borderRadius: '99px',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                >
                  Try Another
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
