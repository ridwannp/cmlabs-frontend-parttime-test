'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getIngredientImageUrl } from '@/lib/api';

export default function IngredientHeroImage({ name }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 300,
            color: 'var(--color-accent)',
          }}
        >
          {name.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--color-card)',
      }}
    >
      <Image
        src={getIngredientImageUrl(name, 'medium')}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        style={{ objectFit: 'contain', padding: '24px' }}
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
