import type { MealMacros } from './types';

export const perMealMacroGoals = (
  daily: MealMacros,
  mealCount: number,
): MealMacros => {
  if (mealCount === 0) {
    return { carb: 0, protein: 0, fat: 0 };
  }

  return {
    carb: daily.carb / mealCount,
    protein: daily.protein / mealCount,
    fat: daily.fat / mealCount,
  };
};
