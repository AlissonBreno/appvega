import { mealsFoodsMock } from 'mocks/mealsFood';
import type { MealFood } from '../../../app/src/modules/Meal/types/MealView';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  addMealFoodEntry,
  getMealsWithFoods,
  removeMealFoodEntry,
  updateMealFoodEntry,
} from './index';

const originalMealsFoods = mealsFoodsMock.map(item => ({ ...item }));

const food = (overrides: Partial<MealFood> = {}): MealFood => ({
  id: 'temp',
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
    expect(meals.map(meal => meal.foods.map(item => item.name))).toEqual([
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
      ?.foods.find(item => item.name === 'Aveia');

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

describe('gravação da refeição', () => {
  it('inclui, altera pelo nome e remove no mesmo dia', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-09T15:00:00.000Z'));
    const day = new Date(2026, 10, 6);

    const added = addMealFoodEntry(
      '2',
      food({ id: 'aveia-1', catalogFoodId: 'aveia', name: 'Aveia' }),
      day,
    );
    await vi.advanceTimersByTimeAsync(500);
    await added;

    let pending = getMealsWithFoods(day);
    await vi.advanceTimersByTimeAsync(500);
    let meals = await pending;

    expect(meals.find(meal => meal.id === '2')?.foods).toEqual([
      {
        id: '2-1',
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

    const updated = updateMealFoodEntry(
      '2',
      food({ catalogFoodId: 'aveia', name: 'Aveia', grams: 80, kcal: 311 }),
      day,
    );
    await vi.advanceTimersByTimeAsync(500);
    await updated;

    pending = getMealsWithFoods(day);
    await vi.advanceTimersByTimeAsync(500);
    meals = await pending;

    expect(meals.find(meal => meal.id === '2')?.foods).toEqual([
      expect.objectContaining({ grams: 80, kcal: 311, name: 'Aveia', catalogFoodId: '1' }),
    ]);

    const removed = removeMealFoodEntry(
      '2',
      food({ catalogFoodId: 'aveia', name: 'Aveia' }),
      day,
    );
    await vi.advanceTimersByTimeAsync(500);
    await removed;

    pending = getMealsWithFoods(day);
    await vi.advanceTimersByTimeAsync(500);
    meals = await pending;

    expect(meals.every(meal => meal.foods.length === 0)).toBe(true);
  });

  it('grava id_user 1 quando a refeição não existe', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-09T15:00:00.000Z'));
    const day = new Date(2026, 10, 6, 12, 0, 0);
    const pending = addMealFoodEntry('99', food(), day);

    await vi.advanceTimersByTimeAsync(500);
    await pending;

    expect(mealsFoodsMock.find(item => item.id_meal === 99)).toMatchObject({
      id_food: 1,
      id_user: 1,
      grams: 40,
      kcal: 156,
      created_at: day.toISOString(),
      edited_at: '2026-11-09T15:00:00.000Z',
    });
  });

  it('alterar sem vínculo volta na hora e a lista fica igual', async () => {
    vi.useFakeTimers();
    const before = mealsFoodsMock.map(item => ({ ...item }));
    let settled = false;
    const pending = updateMealFoodEntry(
      '1',
      food({ catalogFoodId: '999', name: 'Inexistente' }),
      new Date(2026, 10, 6),
    ).then(() => {
      settled = true;
    });

    await Promise.resolve();
    await Promise.resolve();
    expect(settled).toBe(true);
    expect(mealsFoodsMock).toEqual(before);
    await pending;
  });

  it('remover sem vínculo espera 500 ms e a lista fica igual', async () => {
    vi.useFakeTimers();
    const before = mealsFoodsMock.map(item => ({ ...item }));
    let settled = false;
    const pending = removeMealFoodEntry(
      '1',
      food({ catalogFoodId: '999', name: 'Inexistente' }),
      new Date(2026, 10, 6),
    ).then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(settled).toBe(false);
    expect(mealsFoodsMock).toEqual(before);

    await vi.advanceTimersByTimeAsync(1);
    await pending;
    expect(settled).toBe(true);
    expect(mealsFoodsMock).toEqual(before);
  });
});
