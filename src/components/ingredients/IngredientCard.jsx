'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getIngredientImageUrl } from '@/lib/api';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * @param {{ ingredient: { strIngredient: string, strType?: string } }} props
 */
export default function IngredientCard({ ingredient }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const name = ingredient.strIngredient;
  const type = ingredient.strType;
  const initial = name.charAt(0).toUpperCase();
  const imageUrl = getIngredientImageUrl(name, 'small');

  return (
    <motion.article
      variants={cardVariants}
      onClick={() => router.push(`/ingredients/${encodeURIComponent(name)}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        background: hovered ? 'var(--color-accent)' : 'var(--color-card)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        transform: hovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--color-accent)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      aria-label={`Explore ${name}`}
    >
      {/* Image / Fallback */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: imgError ? 'var(--color-border)' : 'transparent',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {imgError ? (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 400,
              color: 'var(--color-accent)',
            }}
          >
            {initial}
          </span>
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            width={72}
            height={72}
            style={{
              objectFit: 'contain',
              filter: hovered ? 'brightness(1.1)' : 'brightness(0.9)',
              transition: 'filter 0.25s',
            }}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 500,
          color: hovered ? 'var(--color-base)' : 'var(--color-text-primary)',
          textAlign: 'center',
          lineHeight: 1.3,
          margin: 0,
          transition: 'color 0.2s',
        }}
      >
        {name}
      </p>

      {type && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: hovered ? 'rgba(87, 14, 26, 0.7)' : 'var(--color-text-muted)',
            transition: 'color 0.2s',
          }}
        >
          {type}
        </span>
      )}
    </motion.article>
  );
}
