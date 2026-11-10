import { describe, expect, it } from 'vitest';
import { searchFoodDismiss, searchFoodPresentation } from './viewport';

describe('searchFoodPresentation', () => {
  it('abre a listagem em dialog no desktop e em página no viewport estreito', () => {
    expect(searchFoodPresentation(true)).toBe('dialog');
    expect(searchFoodPresentation(false)).toBe('page');
  });
});

describe('searchFoodDismiss', () => {
  it('fecha o dialog na Home e a página estreita no histórico do navegador', () => {
    expect(searchFoodDismiss('dialog')).toBe('home');
    expect(searchFoodDismiss('page')).toBe('history');
  });
});
