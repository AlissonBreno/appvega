import { describe, expect, it } from 'vitest';
import { addFoodBackDestination, addFoodSaveDestination } from './navigation';

describe('addFoodBackDestination', () => {
  it('no viewport estreito volta pelo histórico', () => {
    expect(addFoodBackDestination('page', false)).toBe('history');
    expect(addFoodBackDestination('page', true)).toBe('history');
  });

  it('no desktop volta à busca na adição e à Home na edição', () => {
    expect(addFoodBackDestination('dialog', false)).toBe('search');
    expect(addFoodBackDestination('dialog', true)).toBe('home');
  });
});

describe('addFoodSaveDestination', () => {
  it('adição sempre vai para a Home', () => {
    expect(addFoodSaveDestination('page', false)).toBe('home');
    expect(addFoodSaveDestination('dialog', false)).toBe('home');
  });

  it('edição volta pelo histórico no estreito e para a Home no desktop', () => {
    expect(addFoodSaveDestination('page', true)).toBe('history');
    expect(addFoodSaveDestination('dialog', true)).toBe('home');
  });
});
