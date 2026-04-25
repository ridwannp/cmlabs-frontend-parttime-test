'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from './MealCard';
import SearchBar from '@/components/ui/SearchBar';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

/**
 * @param {{ meals: Array, ingredient: string }} props
 */
export default function MealsClient({ meals, ingredient }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return meals;
    const q = debouncedQuery.toLowerCase();
    return meals.filter((m) => m.strMeal.toLowerCase().includes(q));
  }, [meals, debouncedQuery]);

  return (
    <>
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}
      >
        <SearchBar
          id="meal-search"
          value={query}
          onChange={setQuery}
          placeholder={`Search meals with ${ingredient}…`}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginLeft: 'auto',
            }}
          >
            {filtered.length} meal{filtered.length !== 1 ? 's' : ''}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '64px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '40px' }}>🍽️</span>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
            No meals found
          </p>
          {debouncedQuery && (
            <button
              onClick={() => setQuery('')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-accent)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Clear search
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          key={debouncedQuery}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {filtered.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} ingredient={ingredient} />
          ))}
        </motion.div>
      )}
    </>
  );
}
