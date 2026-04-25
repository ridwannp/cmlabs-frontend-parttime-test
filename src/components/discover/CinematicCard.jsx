'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import useMealStore from '@/store/useMealStore';

/**
 * @param {{ meal: Object, index: number }} props
 */
export default function CinematicCard({ meal, index }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.6 });
  const { saveMeal, unsaveMeal, isSaved } = useMealStore();
  const saved = isSaved(meal.idMeal);
  const [swipeDir, setSwipeDir] = useState(null); // 'save' | 'skip'
  const touchStartX = useRef(null);

  // Parallax for image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const handleToggleSave = () => {
    if (saved) unsaveMeal(meal.idMeal);
    else saveMeal({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb });
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > 60) { setSwipeDir('save'); saveMeal({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }); setTimeout(() => setSwipeDir(null), 800); }
    else if (dx < -60) { setSwipeDir('skip'); setTimeout(() => setSwipeDir(null), 600); }
  };

  return (
    <div
      ref={containerRef}
      className="discover-slide"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background image with parallax ──────────── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Blurred BG for widescreen */}
        <Image
          src={meal.strMealThumb}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          style={{
            objectFit: 'cover',
            filter: 'blur(24px) brightness(0.25)',
            transform: 'scale(1.15)',
          }}
        />

        {/* Centered portrait image with parallax */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            y: imageY,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              height: '100%',
            }}
          >
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              priority={index < 2}
              sizes="(max-width: 600px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to top, rgba(87, 14, 26, 0.95) 0%, rgba(87, 14, 26, 0.4) 45%, transparent 75%),
              linear-gradient(to bottom, rgba(87, 14, 26, 0.4) 0%, transparent 20%)
            `,
          }}
        />
      </div>

      {/* ── Swipe feedback overlays ────────────────── */}
      {swipeDir === 'save' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, fontSize: '80px' }}>
          ❤️
        </div>
      )}
      {swipeDir === 'skip' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, fontSize: '80px' }}>
          ⟶
        </div>
      )}

      {/* ── Content ────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: 'clamp(24px, 5vw, 56px)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {meal.strCategory && (
              <span style={tagStyle}>{meal.strCategory}</span>
            )}
            {meal.strArea && (
              <span style={{ ...tagStyle, background: 'transparent', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}>
                {meal.strArea}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 8vw, 80px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: '0 0 28px',
              maxWidth: '14ch',
            }}
          >
            {meal.strMeal}
          </h2>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '400px' }}>
            <Link
              href={`/meals/${meal.idMeal}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 24px',
                background: 'var(--color-accent)',
                color: '#FFF',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '99px',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              View Recipe
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </Link>

            <motion.button
              onClick={handleToggleSave}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `1px solid ${saved ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.2)'}`,
                background: saved ? 'rgba(200,169,110,0.15)' : 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.25s',
              }}
              aria-label={saved ? 'Remove from saved' : 'Save recipe'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#C8A96E' : 'none'} stroke={saved ? '#C8A96E' : 'rgba(255,255,255,0.7)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Index */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.25)',
            margin: '28px 0 0',
            letterSpacing: '0.1em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

const tagStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
  background: 'rgba(200,169,110,0.12)',
  border: '1px solid rgba(200,169,110,0.3)',
  borderRadius: '99px',
  padding: '4px 12px',
};
