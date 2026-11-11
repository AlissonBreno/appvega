import { catalog } from 'mocks/catalog';
import { scalePortion } from './portion';

const findFood = (id: string) => {
  const food = catalog.find(item => item.id === id);

  if (!food) {
    throw new Error(`Alimento ausente no catálogo: ${id}`);
  }

  return food;
};

const factAmount = (
  facts: { label: string; amount: number | null }[],
  label: string,
) => facts.find(fact => fact.label === label)?.amount;

describe('scalePortion', () => {
  const aveia = findFood('aveia');

  test('returns the 100g oats base', () => {
    expect(scalePortion(aveia, 100)).toMatchObject({
      kcal: 389,
      carb: 66.3,
      protein: 16.9,
      fat: 6.9,
    });
  });

  test('matches the breakfast fixture at 50g of oats', () => {
    expect(scalePortion(aveia, 50)).toMatchObject({
      kcal: 195,
      carb: 33.2,
      protein: 8.5,
      fat: 3.5,
    });
  });

  test('keeps moisture and null cholesterol, and scales fiber and magnesium', () => {
    const portion = scalePortion(aveia, 50);

    expect(factAmount(portion.facts, 'Umidade')).toBe(70.1);
    expect(factAmount(portion.facts, 'Colesterol')).toBeNull();
    expect(factAmount(portion.facts, 'Fibra alimentar')).toBe(1.4);
    expect(factAmount(portion.facts, 'Magnésio')).toBe(29.5);
    expect(factAmount(aveia.facts, 'Fibra alimentar')).toBe(2.7);
  });

  test('rounds yogurt fat at 150g to one decimal', () => {
    expect(scalePortion(findFood('iogurte-grego'), 150).fat).toBe(1.1);
  });
});
