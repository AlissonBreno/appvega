import type { Meal } from '~/modules/Meal/types/MealView';

import type { MealTotals } from './mealTotals';

export const dailyMealTotals = (meals: Meal[]): MealTotals => {
  let itemCount = 0;
  let kcal = 0;
  let carb = 0;
  let protein = 0;
  let fat = 0;

  for (const meal of meals) {
    for (const food of meal.foods) {
      itemCount += 1;
      kcal += food.kcal;
      carb += food.carb;
      protein += food.protein;
      fat += food.fat;
    }
  }

  return {
    itemCount,
    kcal,
    macros: { carb, protein, fat },
  };
};
