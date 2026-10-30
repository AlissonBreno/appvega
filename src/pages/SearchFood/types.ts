export type CatalogFood = {
  id: string;
  name: string;
  emoji: string;
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
  favorite: boolean;
};

export type FoodFilter = 'all' | 'favorites';
