import { useContext } from 'react';

import {
  MealsContext,
  type MealsContextValue,
} from '~/modules/Meal/contexts/MealsContext';

export const useMeals = (): MealsContextValue => {
  const meals = useContext(MealsContext);

  if (!meals) {
    throw new Error('useMeals deve ser usado dentro de MealsProvider');
  }

  return meals;
};
