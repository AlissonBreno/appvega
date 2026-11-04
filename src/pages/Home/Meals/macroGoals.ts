import type { MealMacros } from './types';

// Teto de cada refeição é a meta diária inteira.
// Não dividir por meals.length.
export const perMealMacroGoals = (daily: MealMacros): MealMacros => ({
  carb: daily.carb,
  protein: daily.protein,
  fat: daily.fat,
});
