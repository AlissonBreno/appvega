import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { MealFood } from '~/modules/Meal/types/MealView';
import {
  addBatchItem,
  clearMealBatch,
  itemsForMeal,
  removeBatchItem,
  updateBatchItem,
  type MealBatchMap,
} from '~/modules/Meal/utils/mealBatch';

type MealBatchValue = {
  items: (mealId: string) => MealFood[];
  /** Lê o rascunho mais recente, mesmo antes do próximo render. */
  hasDraft: (mealId: string) => boolean;
  addItem: (mealId: string, food: MealFood) => void;
  updateItem: (mealId: string, food: MealFood) => void;
  removeItem: (mealId: string, foodId: string) => void;
  clear: (mealId: string) => void;
};

const MealBatchContext = createContext<MealBatchValue | null>(null);

export const MealBatchProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<MealBatchMap>({});
  const draftsRef = useRef<MealBatchMap>({});
  const commit = (update: (current: MealBatchMap) => MealBatchMap) => {
    draftsRef.current = update(draftsRef.current);
    setDrafts(draftsRef.current);
  };
  const value = useMemo<MealBatchValue>(
    () => ({
      items: mealId => itemsForMeal(drafts, mealId),
      hasDraft: mealId => itemsForMeal(draftsRef.current, mealId).length > 0,
      addItem: (mealId, food) => commit(current => addBatchItem(current, mealId, food)),
      updateItem: (mealId, food) => commit(current => updateBatchItem(current, mealId, food)),
      removeItem: (mealId, foodId) =>
        commit(current => removeBatchItem(current, mealId, foodId)),
      clear: mealId => commit(current => clearMealBatch(current, mealId)),
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
