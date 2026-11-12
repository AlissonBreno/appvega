import {
  addBatchItem,
  batchTotals,
  clearMealBatch,
  commitBatch,
  gramsAreValid,
  itemsForMeal,
  portionScreenMode,
  removeBatchItem,
  updateBatchItem,
} from './mealBatch';
import type { MealFood } from '~/modules/Meal/types/MealView';

const food = (id: string, grams = 100): MealFood => ({
  id,
  catalogFoodId: '1',
  name: 'Arroz',
  emoji: '🍚',
  grams,
  kcal: grams * 1.3,
  carb: grams * 0.28,
  protein: grams * 0.02,
  fat: grams * 0.003,
});

describe('mealBatch', () => {
  it('rejects non-positive grams', () => {
    expect(gramsAreValid(0)).toBe(false);
    expect(gramsAreValid(-1)).toBe(false);
    expect(gramsAreValid(Number.NaN)).toBe(false);
    expect(gramsAreValid(50)).toBe(true);
  });

  it('picks the portion footer from edit state', () => {
    expect(portionScreenMode(true)).toBe('edit');
    expect(portionScreenMode(false)).toBe('batch');
  });

  it('adds, updates, removes, and totals rows without merging duplicates', () => {
    const added = addBatchItem({}, '10', food('a', 100));
    const duplicated = addBatchItem(added, '10', food('b', 50));
    expect(itemsForMeal(duplicated, '10').map(item => item.id)).toEqual(['a', 'b']);

    const updated = updateBatchItem(duplicated, '10', food('a', 200));
    expect(itemsForMeal(updated, '10')[0].grams).toBe(200);

    const removed = removeBatchItem(updated, '10', 'b');
    expect(itemsForMeal(removed, '10')).toHaveLength(1);
    expect(batchTotals(itemsForMeal(updated, '10'))).toEqual({
      kcal: 200 * 1.3 + 50 * 1.3,
      carb: 200 * 0.28 + 50 * 0.28,
      protein: 200 * 0.02 + 50 * 0.02,
      fat: 200 * 0.003 + 50 * 0.003,
    });
    expect(itemsForMeal(clearMealBatch(updated, '10'), '10')).toEqual([]);
  });

  it('keeps the caller draft when a save fails', async () => {
    const foods = [food('a'), food('b')];
    const saved: string[] = [];
    await expect(
      commitBatch(foods, async item => {
        if (item.id === 'b') {
          throw new Error('fail');
        }
        saved.push(item.id);
      }),
    ).rejects.toThrow('fail');
    expect(saved).toEqual(['a']);
  });
});
