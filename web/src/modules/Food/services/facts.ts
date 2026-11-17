import type { Food } from '../../../../../app/src/modules/Food/types/Food';
import type { NutritionFact } from '../../../../../app/src/pages/SearchFood/types';

const FACT_TEMPLATE = [
  { key: 'humidity', label: 'Umidade', unit: '%', scales: false },
  { key: 'cholesterol', label: 'Colesterol', unit: 'mg', scales: false },
  { key: 'fiber', label: 'Fibra alimentar', unit: 'g', scales: true },
  { key: 'ash', label: 'Cinzas', unit: 'g', scales: true },
  { key: 'calcium', label: 'Cálcio', unit: 'mg', scales: true },
  { key: 'magnesium', label: 'Magnésio', unit: 'mg', scales: true },
] as const;

export const toNutritionFacts = (food: Food): NutritionFact[] =>
  FACT_TEMPLATE.map(({ key, label, unit, scales }) => ({
    label,
    unit,
    scales,
    amount: food[key],
  }));
