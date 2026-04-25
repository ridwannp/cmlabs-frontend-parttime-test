import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import MealsClient from '@/components/meals/MealsClient';
import IngredientHeroImage from '@/components/ingredients/IngredientHeroImage';
import { LoadingGrid } from '@/components/ui/LoadingSkeletons';
import { getMealsByIngredient } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { name } = await params;
  const ingredient = decodeURIComponent(name);
  return {
    title: `${ingredient} Recipes`,
    description: `Explore all the delicious meals you can make with ${ingredient}. Discover recipes, techniques, and more.`,
  };
}

async function MealsSection({ ingredient }) {
  const meals = await getMealsByIngredient(ingredient);
  return <MealsClient meals={meals} ingredient={ingredient} />;
}

export default async function IngredientDetailPage({ params }) {
  const { name } = await params;
  const ingredient = decodeURIComponent(name);

  // Prefetch to verify ingredient exists
  const meals = await getMealsByIngredient(ingredient);
  if (!meals || meals.length === 0) {
    // Still render; not-found only if API returned nothing
    // notFound() — commented out so user sees 0 results gracefully
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
        {/* ── Ingredient Hero: 60/40 split ─────────── */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 48px)',
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-12 md:gap-16 mb-16 md:mb-20"
          >
            {/* Left: Text */}
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
                Ingredient
              </p>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 7vw, 96px)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 20px',
                }}
              >
                {ingredient}
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: 'var(--color-text-secondary)',
                  margin: '0 0 24px',
                  lineHeight: 1.6,
                  maxWidth: '480px',
                }}
              >
                {meals.length > 0
                  ? `${meals.length} meal${meals.length !== 1 ? 's' : ''} feature ${ingredient} as a key ingredient.`
                  : `No meals found with ${ingredient} in our database.`}
              </p>
            </div>

            {/* Right: Image */}
            <div style={{ width: 'clamp(160px, 20vw, 280px)', flexShrink: 0 }}>
              <IngredientHeroImage name={ingredient} />
            </div>
          </div>

          {/* ── Meals ──────────────────────────────── */}
          <Suspense fallback={<LoadingGrid cols={4} count={8} height={200} />}>
            <MealsSection ingredient={ingredient} />
          </Suspense>
        </section>

        <div style={{ height: '80px' }} />
      </main>
    </>
  );
}
