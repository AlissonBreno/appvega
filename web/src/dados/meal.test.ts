import { mealsFoodsMock } from 'mocks/mealsFood';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMealsWithFoods } from './index';

const originalMealsFoods = mealsFoodsMock.map(item => ({ ...item }));

afterEach(() => {
  mealsFoodsMock.splice(
    0,
    mealsFoodsMock.length,
    ...originalMealsFoods.map(item => ({ ...item })),
  );
  vi.useRealTimers();
});

describe('getMealsWithFoods', () => {
  it('não resolve antes de 500 ms', async () => {
    vi.useFakeTimers();
    let settled = false;
    const pending = getMealsWithFoods(new Date(2026, 10, 6)).then(meals => {
      settled = true;
      return meals;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    const meals = await pending;
    expect(settled).toBe(true);
    expect(meals).toHaveLength(4);
  });

  it('em 4 de novembro local separa o café vazio das outras refeições', async () => {
    vi.useFakeTimers();
    const pending = getMealsWithFoods(new Date(2026, 10, 4));
    await vi.advanceTimersByTimeAsync(500);
    const meals = await pending;

    expect(meals.map(meal => [meal.id, meal.title, meal.emoji])).toEqual([
      ['1', 'Café da manhã', '☕'],
      ['2', 'Almoço', '🍛'],
      ['3', 'Café da tarde', '🍎'],
      ['4', 'Jantar', '🍜'],
    ]);
    expect(meals.map(meal => meal.foods.map(food => food.name))).toEqual([
      [],
      ['Arroz Integral', 'Peito de Frango', 'Batata Doce'],
      ['Maçã', 'Amêndoas', 'Iogurte Grego'],
      ['Salmão', 'Abacate', 'Ovo Cozido'],
    ]);
  });

  it('em 6 de novembro devolve as quatro refeições vazias', async () => {
    vi.useFakeTimers();
    const pending = getMealsWithFoods(new Date(2026, 10, 6));
    await vi.advanceTimersByTimeAsync(500);
    const meals = await pending;

    expect(meals.every(meal => meal.foods.length === 0)).toBe(true);
  });

  it('mostra 195 kcal na aveia de 50 g do vínculo', async () => {
    vi.useFakeTimers();
    const instant = new Date('2026-01-01T00:00:00.000Z');
    const localDay = new Date(
      instant.getFullYear(),
      instant.getMonth(),
      instant.getDate(),
    );
    const pending = getMealsWithFoods(localDay);
    await vi.advanceTimersByTimeAsync(500);
    const meals = await pending;
    const oats = meals
      .find(meal => meal.id === '1')
      ?.foods.find(food => food.name === 'Aveia');

    expect(oats).toMatchObject({
      id: '1-1',
      catalogFoodId: '1',
      grams: 50,
      kcal: 195,
    });
  });

  it('omite vínculo cujo alimento não existe', async () => {
    vi.useFakeTimers();
    const day = new Date(2026, 10, 6, 15, 0, 0);
    mealsFoodsMock.push({
      id_meal: 1,
      id_food: 999,
      id_user: 1,
      grams: 10,
      kcal: 10,
      protein: 1,
      fat: 1,
      carb: 1,
      created_at: day.toISOString(),
      edited_at: day.toISOString(),
    });

    const pending = getMealsWithFoods(new Date(2026, 10, 6));
    await vi.advanceTimersByTimeAsync(500);
    const meals = await pending;

    expect(meals.every(meal => meal.foods.length === 0)).toBe(true);
  });
});
