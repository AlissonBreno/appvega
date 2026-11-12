import { describe, expect, it } from 'vitest';
import { portionScreenMode } from '../../../../app/src/modules/Meal/utils/mealBatch';

describe('portionScreenMode', () => {
  it('keeps edit mode independent of the draft', () => {
    expect(portionScreenMode(true, 3)).toBe('edit');
  });

  it('offers both actions only when the draft is empty', () => {
    expect(portionScreenMode(false, 0)).toBe('both');
    expect(portionScreenMode(false, 2)).toBe('batch-only');
  });
});
