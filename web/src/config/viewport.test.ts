import { describe, expect, it } from 'vitest';
import {
  mealFlowDismiss,
  mealFlowPresentation,
  searchFoodDismiss,
  searchFoodPresentation,
} from './viewport';

describe('mealFlowPresentation', () => {
  it('abre o fluxo em dialog no desktop e em página no viewport estreito', () => {
    expect(mealFlowPresentation(true)).toBe('dialog');
    expect(mealFlowPresentation(false)).toBe('page');
  });
});

describe('mealFlowDismiss', () => {
  it('fecha o dialog na Home e a página estreita no histórico do navegador', () => {
    expect(mealFlowDismiss('dialog')).toBe('home');
    expect(mealFlowDismiss('page')).toBe('history');
  });
});

describe('aliases de SearchFood', () => {
  it('mantém os nomes antigos apontando para as mesmas regras', () => {
    expect(searchFoodPresentation(true)).toBe(mealFlowPresentation(true));
    expect(searchFoodDismiss('page')).toBe(mealFlowDismiss('page'));
  });
});
