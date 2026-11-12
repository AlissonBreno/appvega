import { describe, expect, it } from 'vitest';
import { mealFlowPresentation } from '~/config/viewport';
import { batchLeaveAction, searchDismissDestination, shouldConfirmBatchLeave } from './leave';

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

describe('batchLeaveAction', () => {
  it('ignora a saída enquanto o lote está salvando', () => {
    expect(batchLeaveAction(2, true)).toBe('ignore');
    expect(batchLeaveAction(0, true)).toBe('ignore');
  });

  it('confirma o descarte só com itens no rascunho', () => {
    expect(batchLeaveAction(2, false)).toBe('confirm');
    expect(batchLeaveAction(0, false)).toBe('leave');
  });
});

describe('searchDismissDestination', () => {
  it('no estreito, busca aberta depois de um lote vai para a Home e não reabre o MealBatch vazio', () => {
    expect(searchDismissDestination({ presentation: 'page', draftCount: 0, fromBatch: true })).toBe(
      'home',
    );
    expect(searchDismissDestination({ presentation: 'page', draftCount: 2, fromBatch: false })).toBe(
      'home',
    );
  });

  it('no estreito, busca sem lote no fluxo continua voltando pelo histórico', () => {
    expect(searchDismissDestination({ presentation: 'page', draftCount: 0, fromBatch: false })).toBe(
      'history',
    );
  });

  it('no desktop sempre vai para a Home', () => {
    expect(searchDismissDestination({ presentation: 'dialog', draftCount: 0, fromBatch: false })).toBe(
      'home',
    );
  });
});
