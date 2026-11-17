import { describe, expect, it } from 'vitest';
import { getFoods } from './food';
import { toNutritionFacts } from './facts';

describe('toNutritionFacts', () => {
  it('projeta seis fatos na ordem do template com amounts da aveia', () => {
    const aveia = getFoods().find(food => food.id_food === 1);

    expect(aveia).toBeDefined();
    expect(toNutritionFacts(aveia!)).toEqual([
      { label: 'Umidade', amount: 70.1, unit: '%', scales: false },
      { label: 'Colesterol', amount: 0, unit: 'mg', scales: false },
      { label: 'Fibra alimentar', amount: 2.7, unit: 'g', scales: true },
      { label: 'Cinzas', amount: 0.5, unit: 'g', scales: true },
      { label: 'Cálcio', amount: 5, unit: 'mg', scales: true },
      { label: 'Magnésio', amount: 59, unit: 'mg', scales: true },
    ]);
  });
});
