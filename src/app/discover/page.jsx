import DiscoverFeed from '@/components/discover/DiscoverFeed';
import { getRandomMealsBatch } from '@/lib/api';

export const metadata = {
  title: 'Discover',
  description: 'Swipe through cinematic meal discoveries. Find your next culinary adventure with IngredientLens.',
};

// Opt out of caching for this page — always fresh random meals
export const dynamic = 'force-dynamic';

export default async function DiscoverPage() {
  const initialMeals = await getRandomMealsBatch(6);

  return (
    <DiscoverFeed initialMeals={initialMeals} />
  );
}
