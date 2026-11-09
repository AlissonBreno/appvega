import { addMealFood, removeMealFood, updateMealFood } from './mealList';
import type { Meal, MealFood } from '~/modules/Meal/types/MealView';

const food = (id: string, grams = 100): MealFood => ({
  id,
  catalogFoodId: id,
  name: id,
  emoji: '🍽️',
  grams,
  kcal: 1,
  carb: 1,
  protein: 1,
  fat: 1,
});

const sample = (): Meal[] => [
  {
    id: 'cafe',
    title: 'Café',
    emoji: '☕',
    foods: [food('aveia')],
  },
  {
    id: 'almoco',
    title: 'Almoço',
    emoji: '🍛',
    foods: [],
  },
];

describe('addMealFood', () => {
  test('appends the food and keeps the previous list', () => {
    const current = sample();
    const banana = food('banana');
    const next = addMealFood(current, 'cafe', banana);

    expect(next).not.toBe(current);
    expect(current[0].foods.map(item => item.id)).toEqual(['aveia']);
    expect(next[0].foods.map(item => item.id)).toEqual(['aveia', 'banana']);
    expect(next[0].foods[1]).toBe(banana);
    expect(next[1]).toBe(current[1]);
  });

  test('ignores an unknown meal', () => {
    const current = sample();
    const next = addMealFood(current, 'nao-existe', food('banana'));

    expect(next).not.toBe(current);
    expect(next).toEqual(current);
    expect(next[0]).toBe(current[0]);
    expect(next[1]).toBe(current[1]);
  });
});

describe('updateMealFood', () => {
  test('replaces the food and keeps the previous list', () => {
    const current = sample();
    const nextFood = food('aveia', 80);
    const next = updateMealFood(current, 'cafe', 'aveia', nextFood);

    expect(next[0].foods[0]).toBe(nextFood);
    expect(current[0].foods[0].grams).toBe(100);
    expect(next[1]).toBe(current[1]);
  });

  test('ignores an unknown meal or food', () => {
    const current = sample();
    const nextFood = food('outro');
    const missingMeal = updateMealFood(
      current,
      'nao-existe',
      'aveia',
      nextFood,
    );
    const missingFood = updateMealFood(current, 'cafe', 'nao-existe', nextFood);

    expect(missingMeal[0]).toBe(current[0]);
    expect(missingFood[0]).toBe(current[0]);
    expect(missingMeal).toEqual(current);
    expect(missingFood).toEqual(current);
  });
});

describe('removeMealFood', () => {
  test('removes the food and keeps the previous list', () => {
    const current = sample();
    const next = removeMealFood(current, 'cafe', 'aveia');

    expect(next[0].foods).toEqual([]);
    expect(current[0].foods).toHaveLength(1);
    expect(next[1]).toBe(current[1]);
  });

  test('ignores an unknown meal or food', () => {
    const current = sample();
    const missingMeal = removeMealFood(current, 'nao-existe', 'aveia');
    const missingFood = removeMealFood(current, 'cafe', 'nao-existe');

    expect(missingMeal[0]).toBe(current[0]);
    expect(missingFood[0]).toBe(current[0]);
    expect(missingMeal).toEqual(current);
    expect(missingFood).toEqual(current);
  });
});
