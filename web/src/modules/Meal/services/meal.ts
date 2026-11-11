import { mealsMock } from 'mocks/meal';
import { mealsFoodsMock } from 'mocks/mealsFood';
import type { Meal as MealView, MealFood } from '../../../../../app/src/modules/Meal/types/MealView';
import type { MealsFood } from '../../../../../app/src/modules/Meal/types/MealsFood';
import { getFoods } from '~/modules/Food/services/food';
import { isSameDay } from '~/utils/date';

export type { MealFood, MealView as Meal };

const MOCK_UPDATE_DELAY_MS = 500;

const waitForMock = () =>
  new Promise<void>(resolve => {
    setTimeout(resolve, MOCK_UPDATE_DELAY_MS);
  });

const resolveFoodId = (food: MealFood) => {
  const numericId = Number(food.catalogFoodId);
  const foods = getFoods();

  if (Number.isInteger(numericId) && foods.some(item => item.id_food === numericId)) {
    return numericId;
  }

  return foods.find(item => item.name === food.name)?.id_food ?? numericId;
};

const matchesEntry = (
  link: MealsFood,
  mealId: number,
  foodId: number,
  date: Date,
) =>
  link.id_meal === mealId &&
  link.id_food === foodId &&
  isSameDay(new Date(link.created_at), date);

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

export const addMealFoodEntry = async (
  mealId: string,
  food: MealFood,
  date: Date,
): Promise<void> => {
  const idMeal = Number(mealId);
  const meal = mealsMock.find(item => item.id_meal === idMeal);
  const now = new Date().toISOString();

  mealsFoodsMock.push({
    id_meal: idMeal,
    id_food: resolveFoodId(food),
    id_user: meal?.id_user ?? 1,
    grams: food.grams,
    kcal: food.kcal,
    protein: food.protein,
    fat: food.fat,
    carb: food.carb,
    created_at: date.toISOString(),
    edited_at: now,
  });

  await waitForMock();
};

export const updateMealFoodEntry = async (
  mealId: string,
  food: MealFood,
  date: Date,
): Promise<void> => {
  const entry = mealsFoodsMock.find(link =>
    matchesEntry(link, Number(mealId), resolveFoodId(food), date),
  );

  if (!entry) {
    return;
  }

  entry.grams = food.grams;
  entry.kcal = food.kcal;
  entry.protein = food.protein;
  entry.fat = food.fat;
  entry.carb = food.carb;
  entry.edited_at = new Date().toISOString();

  await waitForMock();
};

export const removeMealFoodEntry = async (
  mealId: string,
  food: MealFood,
  date: Date,
): Promise<void> => {
  const index = mealsFoodsMock.findIndex(link =>
    matchesEntry(link, Number(mealId), resolveFoodId(food), date),
  );

  if (index >= 0) {
    mealsFoodsMock.splice(index, 1);
  }

  await waitForMock();
};
