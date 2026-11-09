import { mealsMock } from 'mocks/meal';
import { mealsFoodsMock } from 'mocks/mealsFood';
import type { Meal as MealView, MealFood } from '../../../app/src/modules/Meal/types/MealView';
import { isSameDay } from './date';
import { getFoods } from './food';

const MOCK_UPDATE_DELAY_MS = 500;

const waitForMock = () =>
  new Promise<void>(resolve => {
    setTimeout(resolve, MOCK_UPDATE_DELAY_MS);
  });

export const getMealsWithFoods = async (date: Date): Promise<MealView[]> => {
  await waitForMock();

  const foods = getFoods();
  const mealsFoods = mealsFoodsMock.filter(link =>
    isSameDay(new Date(link.created_at), date),
  );

  return mealsMock.map(meal => {
    const linkedFoods: MealFood[] = mealsFoods
      .filter(link => link.id_meal === meal.id_meal && link.id_user === meal.id_user)
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
            grams: link.grams,
            kcal: link.kcal,
            carb: link.carb,
            protein: link.protein,
            fat: link.fat,
          },
        ];
      });

    return {
      id: String(meal.id_meal),
      title: meal.name,
      emoji: meal.emoji,
      foods: linkedFoods,
    };
  });
};
