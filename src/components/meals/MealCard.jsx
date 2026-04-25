'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * @param {{ meal: { idMeal: string, strMeal: string, strMealThumb: string }, ingredient: string }} props
 */
export default function MealCard({ meal, ingredient }) {
  const [hovered, setHovered] = useState(false);
  const href = `/meals/${meal.idMeal}`;

  return (
    <motion.article variants={cardVariants}>
      <Link
        href={href}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: 'var(--color-card)',
            marginBottom: '10px',
          }}
        >
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered
                ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
              transition: 'background 0.4s ease',
            }}
          />

          {/* Arrow icon */}
          <motion.div
            animate={{ x: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(200,169,110,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 500,
            color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            lineHeight: 1.4,
            margin: 0,
            transition: 'color 0.2s',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {meal.strMeal}
        </p>
      </Link>
    </motion.article>
  );
}
