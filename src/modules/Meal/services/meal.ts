import { mealsMock } from '~/modules/Meal/mocks/meal';
import type { Meal } from '~/types';

export const getMeals = (): Meal[] => mealsMock;
