import { mealTotals } from './mealTotals';
import type { Meal, MealFood } from './types';

const food = (
  overrides: Partial<MealFood> & Pick<MealFood, 'id'>,
): MealFood => ({
  name: 'Alimento',
  kcal: 0,
  carb: 0,
  protein: 0,
  fat: 0,
  ...overrides,
});

const meal = (foods: MealFood[]): Meal => ({
  id: 'cafe-da-manha',
  title: 'Café da manhã',
  emoji: '☕',
  kcal: 434,
  itemCount: 3,
  macros: { carb: 36, protein: 24, fat: 8 },
  macroGoal: 100,
  foods,
});

describe('mealTotals', () => {
  test('uses the static meal fields when there are no foods', () => {
    expect(mealTotals(meal([]))).toEqual({
      itemCount: 3,
      kcal: 434,
      macros: { carb: 36, protein: 24, fat: 8 },
      macroGoal: 100,
    });
  });

  test('sums foods and keeps the meal macro goal', () => {
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
      macroGoal: 100,
    });
  });
});
