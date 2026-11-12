import type { MealFood } from '../services/meal';

export type MealBatchMap = Record<string, MealFood[]>;

export type BatchTotals = {
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
};

export type PortionScreenMode = 'batch' | 'edit';

export const gramsAreValid = (grams: number) =>
  Number.isFinite(grams) && grams > 0;

export const portionScreenMode = (editing: boolean): PortionScreenMode =>
  editing ? 'edit' : 'batch';

export const itemsForMeal = (drafts: MealBatchMap, mealId: string) =>
  drafts[mealId] ?? [];

export const addBatchItem = (
  drafts: MealBatchMap,
  mealId: string,
  food: MealFood,
): MealBatchMap => ({
  ...drafts,
  [mealId]: [...itemsForMeal(drafts, mealId), food],
});

export const updateBatchItem = (
  drafts: MealBatchMap,
  mealId: string,
  food: MealFood,
): MealBatchMap => ({
  ...drafts,
  [mealId]: itemsForMeal(drafts, mealId).map(item =>
    item.id === food.id ? food : item,
  ),
});

export const removeBatchItem = (
  drafts: MealBatchMap,
  mealId: string,
  foodId: string,
): MealBatchMap => ({
  ...drafts,
  [mealId]: itemsForMeal(drafts, mealId).filter(item => item.id !== foodId),
});

export const clearMealBatch = (
  drafts: MealBatchMap,
  mealId: string,
): MealBatchMap => ({
  ...drafts,
  [mealId]: [],
});

export const batchTotals = (foods: MealFood[]): BatchTotals =>
  foods.reduce(
    (totals, food) => ({
      kcal: totals.kcal + food.kcal,
      carb: totals.carb + food.carb,
      protein: totals.protein + food.protein,
      fat: totals.fat + food.fat,
    }),
    { kcal: 0, carb: 0, protein: 0, fat: 0 },
  );

export const commitBatch = async (
  foods: MealFood[],
  save: (food: MealFood) => Promise<void>,
) => {
  for (const food of foods) {
    await save(food);
  }
};
