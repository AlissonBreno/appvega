import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getMealsWithFoods } from '~/modules/Meal/services/meal';
import {
  addMealFood,
  removeMealFood,
  updateMealFood,
} from '~/pages/Home/Meals/mealList';
import type { Meal, MealFood } from '~/pages/Home/Meals/types';

export type MealsContextValue = {
  meals: Meal[];
  addFood: (mealId: string, food: MealFood) => void;
  updateFood: (mealId: string, mealFoodId: string, next: MealFood) => void;
  removeFood: (mealId: string, mealFoodId: string) => void;
};

export const MealsContext = createContext<MealsContextValue | null>(null);

type MealsProviderProps = {
  children: ReactNode;
};

export const MealsProvider = ({ children }: MealsProviderProps) => {
  const [meals, setMeals] = useState(getMealsWithFoods);

  const addFood = useCallback((mealId: string, food: MealFood) => {
    setMeals(current => addMealFood(current, mealId, food));
  }, []);

  const updateFood = useCallback(
    (mealId: string, mealFoodId: string, next: MealFood) => {
      setMeals(current => updateMealFood(current, mealId, mealFoodId, next));
    },
    [],
  );

  const removeFood = useCallback((mealId: string, mealFoodId: string) => {
    setMeals(current => removeMealFood(current, mealId, mealFoodId));
  }, []);

  const value = useMemo(
    () => ({ meals, addFood, updateFood, removeFood }),
    [meals, addFood, updateFood, removeFood],
  );

  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
};
