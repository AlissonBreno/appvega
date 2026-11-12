import { describe, expect, it } from 'vitest';
import { mealFlowPresentation } from '~/config/viewport';
import { shouldConfirmBatchLeave } from './leave';

describe('meal batch leave', () => {
  it('asks to discard only when the draft has items', () => {
    expect(shouldConfirmBatchLeave(0)).toBe(false);
    expect(shouldConfirmBatchLeave(2)).toBe(true);
  });

  it('uses the same breakpoint as the other meal screens', () => {
    expect(mealFlowPresentation(false)).toBe('page');
    expect(mealFlowPresentation(true)).toBe('dialog');
  });
});
