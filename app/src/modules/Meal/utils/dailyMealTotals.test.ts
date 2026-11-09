import { dailyMealTotals } from './dailyMealTotals';
import type { Meal, MealFood } from '~/modules/Meal/types/MealView';

const food = (
  overrides: Partial<MealFood> & Pick<MealFood, 'id'>,
): MealFood => ({
  name: 'Alimento',
  emoji: '🍽️',
  grams: 0,
  kcal: 0,
  carb: 0,
  protein: 0,
  fat: 0,
  ...overrides,
  catalogFoodId: overrides.catalogFoodId ?? overrides.id,
});

const meal = (
  id: string,
  title: string,
  foods: MealFood[],
): Meal => ({
  id,
  title,
  emoji: '🍽️',
  foods,
});

describe('dailyMealTotals', () => {
  test('returns zeros when there are no meals', () => {
    expect(dailyMealTotals([])).toEqual({
      itemCount: 0,
      kcal: 0,
      macros: { carb: 0, protein: 0, fat: 0 },
    });
  });

  test('sums four meals with 10 + 10 + 1 macros each', () => {
    const meals = [
      meal('1', 'Café da manhã', [
        food({ id: '1a', kcal: 50, carb: 10, protein: 10, fat: 1 }),
      ]),
      meal('2', 'Almoço', [
        food({ id: '2a', kcal: 50, carb: 10, protein: 10, fat: 1 }),
      ]),
      meal('3', 'Café da tarde', [
        food({ id: '3a', kcal: 50, carb: 10, protein: 10, fat: 1 }),
      ]),
      meal('4', 'Jantar', [
        food({ id: '4a', kcal: 50, carb: 10, protein: 10, fat: 1 }),
      ]),
    ];

    expect(dailyMealTotals(meals)).toEqual({
      itemCount: 4,
      kcal: 200,
      macros: { carb: 40, protein: 40, fat: 4 },
    });
  });
});
