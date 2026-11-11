export type MealFood = {
  id: string;
  catalogFoodId: string;
  name: string;
  emoji: string;
  grams: number;
  kcal: number;
  carb: number;
  protein: number;
  fat: number;
};

export type MealMacros = {
  carb: number;
  protein: number;
  fat: number;
};

export type Meal = {
  id: string;
  title: string;
  emoji: string;
  foods: MealFood[];
};
