export type MealFood = {
  id: string;
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
  kcal: number;
  itemCount: number;
  macros: MealMacros;
  macroGoal: number;
  foods: MealFood[];
};
