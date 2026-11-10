import { describe, expect, it } from 'vitest';
import type { CatalogFood } from '~/modules/Food/services/catalog';
import { filterCatalogFoods, formatFoodCount } from './pages/SearchFood/filterCatalogFoods';
import { sumMacroKcal } from './pages/Profile/DailyGoals/goalDraft';
import { barColorForKcal } from './pages/History/history';
import {
  decreaseGrams,
  formatFact,
  formatGrams,
  formatOneDecimal,
  gramsAtLeastTen,
} from './pages/AddFood/quantity';
import { scalePortion } from './modules/Meal/utils/portion';

const aveia: CatalogFood = {
  id: 'aveia',
  name: 'Aveia',
  emoji: '🌾',
  kcal: 389,
  carb: 66.3,
  protein: 16.9,
  fat: 6.9,
  favorite: true,
  facts: [
    { label: 'Umidade', amount: 70.1, unit: '%', scales: false },
    { label: 'Fibra alimentar', amount: 2.7, unit: 'g', scales: true },
    { label: 'Colesterol', amount: null, unit: 'mg', scales: false },
  ],
};

describe('porção e quantidade', () => {
  it('escala kcal com 0 casas e macros com 1, sem mexer em fato que não escala', () => {
    const scaled = scalePortion(aveia, 50);

    expect(scaled.kcal).toBe(195);
    expect(scaled.carb).toBe(33.2);
    expect(scaled.facts[0].amount).toBe(70.1);
    expect(scaled.facts[1].amount).toBe(1.4);
    expect(scaled.facts[2].amount).toBeNull();
  });

  it('menos tira 10 e 15 vira 5; em 10 não desce', () => {
    expect(decreaseGrams(15)).toBe(5);
    expect(decreaseGrams(10)).toBe(10);
    expect(gramsAtLeastTen(10)).toBe(false);
    expect(gramsAtLeastTen(15)).toBe(true);
  });

  it('formata gramas e fatos nutricionais em pt-BR', () => {
    expect(formatGrams(100)).toBe('100g');
    expect(formatGrams(16.9)).toBe('16,9g');
    expect(formatOneDecimal(16.9)).toBe('16,9');
    expect(formatFact({ amount: null, unit: 'mg' })).toBe('NA mg');
    expect(formatFact({ amount: 2.7, unit: 'g' })).toBe('2,7 g');
  });
});

describe('histórico e metas', () => {
  it('pinta a barra pela faixa de kcal', () => {
    expect(barColorForKcal(2320)).toBe('above');
    expect(barColorForKcal(1800)).toBe('near');
    expect(barColorForKcal(1700)).toBe('within');
  });

  it('soma os macros do mock em 2155 kcal', () => {
    expect(
      sumMacroKcal({
        goal_kcal: '2200',
        goal_carb: '220',
        goal_prot: '150',
        goal_fat: '75',
      }),
    ).toBe(2155);
  });
});

describe('busca', () => {
  it('filtra por nome e favorito e usa o singular só no 1', () => {
    const foods = filterCatalogFoods({
      foods: [aveia, { ...aveia, id: 'banana', name: 'Banana', favorite: false }],
      query: '  BAN ',
      filter: 'all',
      favoriteIds: new Set(['aveia']),
    });

    expect(foods.map(food => food.name)).toEqual(['Banana']);
    expect(formatFoodCount(1)).toBe('1 alimento encontrado');
    expect(formatFoodCount(0)).toBe('0 alimentos encontrados');
  });
});
