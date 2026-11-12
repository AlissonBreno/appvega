import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { MealFood } from '../../../app/src/modules/Meal/types/MealView';
import {
  addBatchItem,
  clearMealBatch,
  itemsForMeal,
  removeBatchItem,
  updateBatchItem,
  type MealBatchMap,
} from '../../../app/src/modules/Meal/utils/mealBatch';

type MealBatchValue = {
  items: (mealId: string) => MealFood[];
  addItem: (mealId: string, food: MealFood) => void;
  updateItem: (mealId: string, food: MealFood) => void;
  removeItem: (mealId: string, foodId: string) => void;
  clear: (mealId: string) => void;
};

const MealBatchContext = createContext<MealBatchValue | null>(null);

export const MealBatchProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<MealBatchMap>({});
  const value = useMemo<MealBatchValue>(
    () => ({
      items: mealId => itemsForMeal(drafts, mealId),
      addItem: (mealId, food) => setDrafts(current => addBatchItem(current, mealId, food)),
      updateItem: (mealId, food) => setDrafts(current => updateBatchItem(current, mealId, food)),
      removeItem: (mealId, foodId) =>
        setDrafts(current => removeBatchItem(current, mealId, foodId)),
      clear: mealId => setDrafts(current => clearMealBatch(current, mealId)),
    }),
    [drafts],
  );

  return <MealBatchContext.Provider value={value}>{children}</MealBatchContext.Provider>;
};

export const useMealBatch = () => {
  const value = useContext(MealBatchContext);
  if (!value) {
    throw new Error('useMealBatch deve ficar dentro de MealBatchProvider');
  }
  return value;
};
