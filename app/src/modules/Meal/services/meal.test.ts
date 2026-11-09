import { mealsFoodsMock } from 'mocks/mealsFood';
import type { MealFood } from '~/modules/Meal/types/MealView';

import {
  addMealFoodEntry,
  getMealsWithFoods,
  removeMealFoodEntry,
  updateMealFoodEntry,
} from './meal';

const NOV_4 = new Date(2026, 10, 4);
const NOV_6 = new Date(2026, 10, 6);

const originalMealsFoods = mealsFoodsMock.map(item => ({ ...item }));

const food = (overrides: Partial<MealFood> = {}): MealFood => ({
  id: '1-1',
  catalogFoodId: '1',
  name: 'Aveia',
  emoji: '🌾',
  grams: 40,
  kcal: 156,
  carb: 26.5,
  protein: 6.8,
  fat: 2.8,
  ...overrides,
});

const flushMock = async () => {
  await jest.advanceTimersByTimeAsync(500);
};

afterEach(() => {
  mealsFoodsMock.splice(
    0,
    mealsFoodsMock.length,
    ...originalMealsFoods.map(item => ({ ...item })),
  );
});

describe('getMealsWithFoods', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns foods for meals 2–4 on 4 Nov and leaves breakfast empty', async () => {
    const pending = getMealsWithFoods(NOV_4);
    await flushMock();
    const meals = await pending;

    expect(meals.map(meal => meal.title)).toEqual([
      'Café da manhã',
      'Almoço',
      'Café da tarde',
      'Jantar',
    ]);
    expect(meals.map(meal => meal.foods.map(item => item.name))).toEqual([
      [],
      ['Arroz Integral', 'Peito de Frango', 'Batata Doce'],
      ['Maçã', 'Amêndoas', 'Iogurte Grego'],
      ['Salmão', 'Abacate', 'Ovo Cozido'],
    ]);
  });

  test('returns four empty meals on 6 Nov', async () => {
    const pending = getMealsWithFoods(NOV_6);
    await flushMock();
    const meals = await pending;

    expect(meals).toHaveLength(4);
    expect(meals.every(meal => meal.foods.length === 0)).toBe(true);
  });

  test('keeps an added food when the same day is fetched again', async () => {
    const added = addMealFoodEntry('1', food(), NOV_6);
    await flushMock();
    await added;

    const pending = getMealsWithFoods(NOV_6);
    await flushMock();
    const meals = await pending;
    const breakfast = meals.find(meal => meal.id === '1');

    expect(breakfast?.foods).toEqual([
      {
        id: '1-1',
        catalogFoodId: '1',
        name: 'Aveia',
        emoji: '🌾',
        grams: 40,
        kcal: 156,
        carb: 26.5,
        protein: 6.8,
        fat: 2.8,
      },
    ]);
  });

  test('updates and removes the persisted row for that day', async () => {
    const added = addMealFoodEntry(
      '2',
      food({ catalogFoodId: 'aveia', name: 'Aveia' }),
      NOV_6,
    );
    await flushMock();
    await added;

    const updated = updateMealFoodEntry(
      '2',
      food({ catalogFoodId: 'aveia', name: 'Aveia', grams: 80, kcal: 311 }),
      NOV_6,
    );
    await flushMock();
    await updated;

    const afterUpdate = getMealsWithFoods(NOV_6);
    await flushMock();
    const updatedMeals = await afterUpdate;

    expect(updatedMeals.find(meal => meal.id === '2')?.foods).toEqual([
      expect.objectContaining({ grams: 80, kcal: 311, name: 'Aveia' }),
    ]);

    const removed = removeMealFoodEntry(
      '2',
      food({ catalogFoodId: 'aveia', name: 'Aveia' }),
      NOV_6,
    );
    await flushMock();
    await removed;

    const afterRemove = getMealsWithFoods(NOV_6);
    await flushMock();
    const removedMeals = await afterRemove;

    expect(removedMeals.every(meal => meal.foods.length === 0)).toBe(true);
  });
});
