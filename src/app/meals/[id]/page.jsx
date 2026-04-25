import { notFound } from 'next/navigation';
import Script from 'next/script';
import Navbar from '@/components/ui/Navbar';
import MealDetail from '@/components/meals/MealDetail';
import { getMealById, extractRecipe } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meal = await getMealById(id);
  if (!meal) return { title: 'Meal Not Found' };

  return {
    title: meal.strMeal,
    description: meal.strInstructions?.slice(0, 160) ?? `Discover how to cook ${meal.strMeal}.`,
    openGraph: {
      title: meal.strMeal,
      description: meal.strInstructions?.slice(0, 160) ?? '',
      images: [{ url: meal.strMealThumb, width: 640, height: 640, alt: meal.strMeal }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meal.strMeal,
      images: [meal.strMealThumb],
    },
  };
}

export default async function MealPage({ params }) {
  const { id } = await params;
  const meal = await getMealById(id);
  if (!meal) notFound();

  const recipe = extractRecipe(meal);

  // JSON-LD Recipe schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: meal.strMeal,
    image: [meal.strMealThumb],
    description: meal.strInstructions?.slice(0, 200) ?? '',
    recipeCategory: meal.strCategory,
    recipeCuisine: meal.strArea,
    recipeIngredient: recipe.map(({ ingredient, measure }) =>
      measure ? `${measure} ${ingredient}` : ingredient
    ),
    recipeInstructions: meal.strInstructions
      ?.split(/\r?\n/)
      .filter(Boolean)
      .map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: step,
      })) ?? [],
  };

  return (
    <>
      <Script
        id="recipe-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: '80px',
          paddingBottom: '80px',
          padding: 'clamp(16px, 4vw, 48px)',
          paddingTop: '80px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <MealDetail meal={meal} />
      </main>
    </>
  );
}
