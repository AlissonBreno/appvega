import type { Meal, MealMacros } from './types';

export type MealTotals = {
  itemCount: number;
  kcal: number;
  macros: MealMacros;
  macroGoal: number;
};

export const mealTotals = (meal: Meal): MealTotals => {
  if (meal.foods.length === 0) {
    return {
      itemCount: meal.itemCount,
      kcal: meal.kcal,
      macros: meal.macros,
      macroGoal: meal.macroGoal,
    };
  }

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
    macroGoal: meal.macroGoal,
  };
};
