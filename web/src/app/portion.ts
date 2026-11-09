import type { NutritionFact } from '../../../app/src/pages/SearchFood/types';

type PortionBase = {
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
  facts: NutritionFact[];
};

const roundScaled = (amount: number, grams: number, digits: number) => {
  const factor = 10 ** digits;

  return Math.round(((amount * grams) / 100) * factor) / factor;
};

export const scalePortion = (base: PortionBase, grams: number) => ({
  kcal: roundScaled(base.kcal, grams, 0),
  carb: roundScaled(base.carb, grams, 1),
  protein: roundScaled(base.protein, grams, 1),
  fat: roundScaled(base.fat, grams, 1),
  facts: base.facts.map(fact => {
    if (fact.amount === null || !fact.scales) {
      return fact;
    }

    return { ...fact, amount: roundScaled(fact.amount, grams, 1) };
  }),
});
