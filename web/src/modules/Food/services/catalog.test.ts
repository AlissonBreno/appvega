import { describe, expect, it } from 'vitest';
import { getFoods } from './food';
import { getCatalog } from './catalog';

describe('getCatalog', () => {
  it('devolve foods na ordem de id_food 1–11 com favorite só nos ids passados', () => {
    const favoriteIds = new Set([1, 2, 4, 7]);
    const foods = getCatalog(favoriteIds);
    const base = getFoods();

    expect(foods.map(food => food.id_food)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(foods.filter(food => food.favorite).map(food => food.id_food)).toEqual([1, 2, 4, 7]);
    expect(foods.every(food => !('facts' in food))).toBe(true);

    foods.forEach((food, index) => {
      const { favorite, ...rest } = food;
      expect(rest).toEqual(base[index]);
      expect(favorite).toBe(favoriteIds.has(food.id_food));
    });
  });

  it('marca favorite false quando o set está vazio', () => {
    const foods = getCatalog(new Set());

    expect(foods.every(food => food.favorite === false)).toBe(true);
  });
});
