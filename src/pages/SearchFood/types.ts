export type NutritionFact = {
  label: string;
  amount: number | null;
  unit: string;
  scales: boolean;
};

export type CatalogFood = {
  id: string;
  name: string;
  emoji: string;
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
  favorite: boolean;
  facts: NutritionFact[];
};

export type FoodFilter = 'all' | 'favorites';
