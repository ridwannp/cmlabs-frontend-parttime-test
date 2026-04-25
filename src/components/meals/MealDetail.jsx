'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { extractRecipe, getYoutubeEmbedUrl } from '@/lib/api';
import useMealStore from '@/store/useMealStore';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function MealDetail({ meal }) {
  const { saveMeal, unsaveMeal, isSaved } = useMealStore();
  const saved = isSaved(meal.idMeal);
  const recipe = extractRecipe(meal);
  const embedUrl = getYoutubeEmbedUrl(meal.strYoutube);
  const instructions = meal.strInstructions?.split(/\r?\n/).filter((s) => s.trim()) ?? [];

  const handleToggleSave = () => {
    if (saved) {
      unsaveMeal(meal.idMeal);
    } else {
      saveMeal({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb });
    }
  };

  return (
    <article style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* ── Hero ───────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: 'var(--color-card)',
          marginBottom: '36px',
        }}
      >
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          priority
          sizes="(max-width: 960px) 100vw, 960px"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(87, 14, 26, 0.7) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* ── Title + Meta ────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                margin: '0 0 16px',
              }}
            >
              {meal.strMeal}
            </h1>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {meal.strCategory && <Badge label={meal.strCategory} />}
              {meal.strArea && <Badge label={meal.strArea} dim />}
            </div>
          </div>

          {/* Save button */}
          <motion.button
            onClick={handleToggleSave}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: `1px solid ${saved ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: saved ? 'var(--color-accent)' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.25s',
            }}
            aria-label={saved ? 'Remove from saved' : 'Save recipe'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? '#fff' : 'none'} stroke={saved ? '#fff' : 'var(--color-text-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Two-column layout ───────────────────────── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start"
      >
        {/* Left: Instructions */}
        <div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            style={sectionHeading}
          >
            Tutorial & Langkah Memasak
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {instructions.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i * 0.3}
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 300,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: '32px',
                    paddingTop: '2px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {step}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Video Section */}
          {embedUrl && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              style={{ marginTop: '64px' }}
            >
              <h2 style={sectionHeading}>Video Tutorial</h2>
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  background: 'var(--color-card)',
                }}
              >
                <iframe
                  src={embedUrl}
                  title={`${meal.strMeal} video`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Recipe card (sticky) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            position: 'sticky',
            top: '100px',
            background: 'rgba(255, 179, 0, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(87, 14, 26, 0.15)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 500,
              color: 'var(--color-base)',
              margin: '0 0 24px',
              borderBottom: '1px solid rgba(87, 14, 26, 0.2)',
              paddingBottom: '12px',
            }}
          >
            Bahan-bahan Resep
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recipe.map(({ ingredient, measure }) => (
              <li
                key={ingredient}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '8px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(87, 14, 26, 0.15)',
                }}
              >
                <Link href={`/ingredients/${encodeURIComponent(ingredient)}`} style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-base)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-base)')}
                  >
                    {ingredient}
                  </span>
                </Link>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'rgba(87, 14, 26, 0.7)',
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {measure || '—'}
                </span>
              </li>
            ))}
          </ul>

          {meal.strSource && (
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                marginTop: '20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--color-base)',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-base)')}
            >
              View Original Source →
            </a>
          )}
        </motion.div>
      </div>
    </article>
  );
}

function Badge({ label, dim }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: dim ? 'var(--color-text-muted)' : 'var(--color-accent)',
        background: dim ? 'transparent' : 'rgba(200,169,110,0.1)',
        border: `1px solid ${dim ? 'var(--color-border)' : 'rgba(200,169,110,0.25)'}`,
        borderRadius: '99px',
        padding: '4px 12px',
      }}
    >
      {label}
    </span>
  );
}

const sectionHeading = {
  fontFamily: 'var(--font-display)',
  fontSize: '36px',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  color: 'var(--color-text-primary)',
  margin: '0 0 32px',
};
