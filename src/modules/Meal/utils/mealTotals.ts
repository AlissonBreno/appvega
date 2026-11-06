import type { Meal, MealMacros } from '~/modules/Meal/types/MealView';

export type MealTotals = {
  itemCount: number;
  kcal: number;
  macros: MealMacros;
};

export const mealTotals = (meal: Meal): MealTotals => {
  const summed = meal.foods.reduce(
    (totals, food) => ({
      kcal: totals.kcal + food.kcal,
      carb: totals.carb + food.carb,
      protein: totals.protein + food.protein,
      fat: totals.fat + food.fat,
    }),
    { kcal: 0, carb: 0, protein: 0, fat: 0 },
  );

  return {
    itemCount: meal.foods.length,
    kcal: summed.kcal,
    macros: {
      carb: summed.carb,
      protein: summed.protein,
      fat: summed.fat,
    },
  };
};
