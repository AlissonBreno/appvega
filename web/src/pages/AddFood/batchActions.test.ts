import { describe, expect, it } from 'vitest';
import { portionScreenMode } from './batchActions';

describe('portionScreenMode', () => {
  it('keeps edit mode for saving an existing meal food', () => {
    expect(portionScreenMode(true)).toBe('edit');
  });

  it('always sends a new food into the batch screen', () => {
    expect(portionScreenMode(false)).toBe('batch');
  });
});
