import { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import PageHeader from '@/components/ui/PageHeader';
import { LoadingList } from '@/components/ui/LoadingSkeletons';
import IngredientsClient from '@/components/ingredients/IngredientsClient';
import RandomMealGenerator from '@/components/discover/RandomMealGenerator';
import { getIngredients } from '@/lib/api';

export const metadata = {
  title: 'The Pantry',
  description: 'Browse hundreds of culinary ingredients and discover the meals you can make with them.',
};

async function IngredientsSection() {
  const ingredients = await getIngredients();
  return <IngredientsClient ingredients={ingredients} />;
}

export default function IngredientsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
        {/* ── Hero section ─────────────────────────── */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(48px, 8vw, 96px) clamp(16px, 5vw, 48px) 0',
          }}
        >
          {/* Asymmetric hero: header left, random meal right */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-12 lg:gap-16 mb-16 lg:mb-24"
          >
            <div>
              <PageHeader
                eyebrow="Ingredient Explorer"
                title="The Pantry"
                subtitle="Start with an ingredient, discover a world of meals. Click any ingredient to explore what you can cook."
              />
            </div>

            {/* Random Meal Generator panel */}
            <RandomMealGenerator />
          </div>

          {/* ── Divider ───────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              All Ingredients
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          </div>

          {/* ── Ingredient grid ───────────────────── */}
          <Suspense fallback={<LoadingList count={12} />}>
            <IngredientsSection />
          </Suspense>
        </section>

        {/* Footer spacing */}
        <div style={{ height: '80px' }} />
      </main>
    </>
  );
}
