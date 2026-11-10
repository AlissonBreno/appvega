import { catalog } from 'mocks/catalog';
import { describe, expect, it } from 'vitest';
import { getCatalog } from './catalog';

describe('getCatalog', () => {
  it('devolve a mesma lista, na ordem do arquivo', () => {
    const foods = getCatalog();

    expect(foods).toBe(catalog);
    expect(foods.map(food => food.id)).toEqual([
      'aveia',
      'iogurte-grego',
      'banana',
      'peito-de-frango',
      'arroz-integral',
      'batata-doce',
      'ovo-cozido',
      'abacate',
      'salmao',
      'maca',
      'amendoas',
    ]);
  });

  it('mantém os favoritos iniciais e os fatos só na aveia', () => {
    const foods = getCatalog();
    const favorites = foods.filter(food => food.favorite).map(food => food.id);

    expect(favorites).toEqual([
      'aveia',
      'iogurte-grego',
      'peito-de-frango',
      'ovo-cozido',
    ]);
    expect(foods.find(food => food.id === 'aveia')?.facts.length).toBeGreaterThan(0);
    expect(
      foods.filter(food => food.id !== 'aveia').every(food => food.facts.length === 0),
    ).toBe(true);
  });
});
