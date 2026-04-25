'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMealStore = create(
  persist(
    (set, get) => ({
      // Saved meals (heart)
      savedMeals: [],
      saveMeal: (meal) => {
        const exists = get().savedMeals.find((m) => m.idMeal === meal.idMeal);
        if (!exists) {
          set((s) => ({ savedMeals: [...s.savedMeals, meal] }));
        }
      },
      unsaveMeal: (id) => {
        set((s) => ({ savedMeals: s.savedMeals.filter((m) => m.idMeal !== id) }));
      },
      isSaved: (id) => get().savedMeals.some((m) => m.idMeal === id),

      // Scroll position per ingredient page
      scrollPositions: {},
      saveScrollPosition: (key, pos) =>
        set((s) => ({ scrollPositions: { ...s.scrollPositions, [key]: pos } })),
      getScrollPosition: (key) => get().scrollPositions[key] ?? 0,
    }),
    {
      name: 'ingredientlens-store',
    }
  )
);

export default useMealStore;
