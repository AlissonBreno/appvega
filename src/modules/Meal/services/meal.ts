import { mealsMock } from '~/modules/Meal/mocks/meal';
import { mealsFoodsMock } from '~/modules/Meal/mocks/mealsFood';
import { getFoods } from '~/modules/Food/services/food';
import type { Meal, MealsFood } from '~/types';
import type { Meal as HomeMeal, MealFood } from '~/pages/Home/Meals/types';

export const getMeals = (): Meal[] => mealsMock;

export const getMealsFoods = (): MealsFood[] => mealsFoodsMock;

export const getMealsWithFoods = (): HomeMeal[] => {
  const meals = getMeals();
  const foods = getFoods();
  const mealsFoods = getMealsFoods();

  return meals.map(meal => {
    const linkedFoods: MealFood[] = mealsFoods
      .filter(
        link => link.id_meal === meal.id_meal && link.id_user === meal.id_user,
      )
      .flatMap(link => {
        const food = foods.find(item => item.id_food === link.id_food);
        if (!food) {
          return [];
        }

        return [
          {
            id: `${link.id_meal}-${link.id_food}`,
            catalogFoodId: String(link.id_food),
            name: food.name,
            emoji: food.emoji,
            grams: 100,
            kcal: food.kcal,
            carb: 0,
            protein: food.protein,
            fat: food.fat,
          },
        ];
      });

    const totals = linkedFoods.reduce(
      (sum, food) => ({
        kcal: sum.kcal + food.kcal,
        carb: sum.carb + food.carb,
        protein: sum.protein + food.protein,
        fat: sum.fat + food.fat,
      }),
      { kcal: 0, carb: 0, protein: 0, fat: 0 },
    );

    return {
      id: String(meal.id_meal),
      title: meal.name,
      emoji: meal.emoji,
      kcal: totals.kcal,
      itemCount: linkedFoods.length,
      macros: {
        carb: totals.carb,
        protein: totals.protein,
        fat: totals.fat,
      },
      macroGoal: 0,
      foods: linkedFoods,
    };
  });
};
