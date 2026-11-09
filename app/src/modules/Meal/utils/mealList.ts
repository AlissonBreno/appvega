import type { Meal, MealFood } from '~/modules/Meal/types/MealView';

export const addMealFood = (
  meals: Meal[],
  mealId: string,
  food: MealFood,
): Meal[] => {
  return meals.map(meal => {
    if (meal.id !== mealId) {
      return meal;
    }

    return {
      ...meal,
      foods: [...meal.foods, food],
    };
  });
};

export const updateMealFood = (
  meals: Meal[],
  mealId: string,
  mealFoodId: string,
  next: MealFood,
): Meal[] => {
  return meals.map(meal => {
    if (meal.id !== mealId) {
      return meal;
    }

    if (!meal.foods.some(food => food.id === mealFoodId)) {
      return meal;
    }

    return {
      ...meal,
      foods: meal.foods.map(food => (food.id === mealFoodId ? next : food)),
    };
  });
};

export const removeMealFood = (
  meals: Meal[],
  mealId: string,
  mealFoodId: string,
): Meal[] => {
  return meals.map(meal => {
    if (meal.id !== mealId) {
      return meal;
    }

    if (!meal.foods.some(food => food.id === mealFoodId)) {
      return meal;
    }

    return {
      ...meal,
      foods: meal.foods.filter(food => food.id !== mealFoodId),
    };
  });
};
