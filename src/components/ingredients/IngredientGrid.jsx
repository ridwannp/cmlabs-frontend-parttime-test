'use client';

import { motion, AnimatePresence } from 'framer-motion';
import IngredientCard from './IngredientCard';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

/**
 * @param {{ ingredients: Array, query: string }} props
 */
export default function IngredientGrid({ ingredients, query }) {
  if (ingredients.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          padding: '80px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '48px' }}>🔍</span>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
          }}
        >
          No ingredients found
        </p>
        {query && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--color-text-muted)',
            }}
          >
            No results for &quot;<strong style={{ color: 'var(--color-text-secondary)' }}>{query}</strong>&quot;
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={query}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '12px',
      }}
    >
      <AnimatePresence>
        {ingredients.map((item) => (
          <IngredientCard key={item.strIngredient} ingredient={item} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
