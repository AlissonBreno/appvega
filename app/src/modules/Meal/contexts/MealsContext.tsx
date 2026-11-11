import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  addMealFoodEntry,
  getMealsWithFoods,
  removeMealFoodEntry,
  updateMealFoodEntry,
} from '~/modules/Meal/services/meal';
import type { Meal, MealFood } from '~/modules/Meal/types/MealView';
import {
  addMealFood,
  removeMealFood,
  updateMealFood,
} from '~/modules/Meal/utils/mealList';

export type MealsContextValue = {
  meals: Meal[];
  selectedDate: Date;
  isLoading: boolean;
  selectDate: (date: Date) => void;
  refreshMeals: () => void;
  addFood: (mealId: string, food: MealFood) => void;
  updateFood: (mealId: string, mealFoodId: string, next: MealFood) => void;
  removeFood: (mealId: string, mealFoodId: string) => void;
};

export const MealsContext = createContext<MealsContextValue | null>(null);

type MealsProviderProps = {
  children: ReactNode;
};

export const MealsProvider = ({ children }: MealsProviderProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isLoading, setIsLoading] = useState(true);
  const requestIdRef = useRef(0);
  const selectedDateRef = useRef(selectedDate);
  const mealsRef = useRef(meals);

  selectedDateRef.current = selectedDate;
  mealsRef.current = meals;

  const loadMeals = useCallback(async (date: Date) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);

    const next = await getMealsWithFoods(date);

    if (requestId !== requestIdRef.current) {
      return;
    }

    setMeals(next);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMeals(selectedDate).catch(() => undefined);
  }, [loadMeals, selectedDate]);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const refreshMeals = useCallback(() => {
    loadMeals(selectedDateRef.current).catch(() => undefined);
  }, [loadMeals]);

  const addFood = useCallback((mealId: string, food: MealFood) => {
    setMeals(current => addMealFood(current, mealId, food));
    addMealFoodEntry(mealId, food, selectedDateRef.current).catch(
      () => undefined,
    );
  }, []);

  const updateFood = useCallback(
    (mealId: string, mealFoodId: string, next: MealFood) => {
      setMeals(current => updateMealFood(current, mealId, mealFoodId, next));
      updateMealFoodEntry(mealId, next, selectedDateRef.current).catch(
        () => undefined,
      );
    },
    [],
  );

  const removeFood = useCallback((mealId: string, mealFoodId: string) => {
    const food = mealsRef.current
      .find(meal => meal.id === mealId)
      ?.foods.find(item => item.id === mealFoodId);

    setMeals(current => removeMealFood(current, mealId, mealFoodId));

    if (food) {
      removeMealFoodEntry(mealId, food, selectedDateRef.current).catch(
        () => undefined,
      );
    }
  }, []);

  const value = useMemo(
    () => ({
      meals,
      selectedDate,
      isLoading,
      selectDate,
      refreshMeals,
      addFood,
      updateFood,
      removeFood,
    }),
    [
      meals,
      selectedDate,
      isLoading,
      selectDate,
      refreshMeals,
      addFood,
      updateFood,
      removeFood,
    ],
  );

  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
};
