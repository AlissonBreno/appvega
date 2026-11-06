import { mealTotals } from './mealTotals';
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

const meal = (foods: MealFood[]): Meal => ({
  id: 'cafe-da-manha',
  title: 'Café da manhã',
  emoji: '☕',
  foods,
});

describe('mealTotals', () => {
  test('returns zeros when there are no foods', () => {
    expect(mealTotals(meal([]))).toEqual({
      itemCount: 0,
      kcal: 0,
      macros: { carb: 0, protein: 0, fat: 0 },
    });
  });

  test('sums foods into meal totals', () => {
    expect(
      mealTotals(
        meal([
          food({ id: '1', kcal: 200, carb: 20, protein: 10, fat: 5 }),
          food({
            id: '2',
            name: 'Iogurte',
            kcal: 150,
            carb: 12,
            protein: 8,
            fat: 4,
          }),
        ]),
      ),
    ).toEqual({
      itemCount: 2,
      kcal: 350,
      macros: { carb: 32, protein: 18, fat: 9 },
    });
  });
});
