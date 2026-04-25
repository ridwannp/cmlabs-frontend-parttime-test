const BASE = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Get all ingredients from MealDB
 * @returns {Promise<Array>}
 */
export async function getIngredients() {
  try {
    const res = await fetch(`${BASE}/list.php?i=list`, {
      next: { revalidate: 86400 }, // 24h cache
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals ?? [];
  } catch {
    return [];
  }
}

/**
 * Get meals by ingredient name
 * @param {string} ingredient
 * @returns {Promise<Array>}
 */
export async function getMealsByIngredient(ingredient) {
  try {
    const res = await fetch(
      `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals ?? [];
  } catch {
    return [];
  }
}

/**
 * Get meal detail by ID
 * @param {string|number} id
 * @returns {Promise<Object|null>}
 */
export async function getMealById(id) {
  try {
    const res = await fetch(`${BASE}/lookup.php?i=${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.meals?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Get a single random meal (no caching)
 * @returns {Promise<Object|null>}
 */
export async function getRandomMeal() {
  try {
    const res = await fetch(`${BASE}/random.php?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.meals?.[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Get a batch of random meals
 * @param {number} count
 * @returns {Promise<Array>}
 */
export async function getRandomMealsBatch(count = 5) {
  const promises = Array.from({ length: count }, () => getRandomMeal());
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

/**
 * Get ingredient thumbnail image URL
 * @param {string} name
 * @param {'small'|'medium'} size
 */
export function getIngredientImageUrl(name, size = 'medium') {
  const suffix = size === 'small' ? '-Small' : '-Medium';
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}${suffix}.png`;
}

/**
 * Extract recipe ingredients/measures from meal object
 * @param {Object} meal
 * @returns {Array<{ingredient: string, measure: string}>}
 */
export function extractRecipe(meal) {
  if (!meal) return [];
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push({ ingredient: ingredient.trim(), measure: (measure ?? '').trim() });
    }
  }
  return items;
}

/**
 * Convert YouTube watch URL to embed URL
 * @param {string|null} url
 * @returns {string|null}
 */
export function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
