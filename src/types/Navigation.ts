export type StackParamList = {
  Login: undefined;
  Main: undefined;
  SearchFood: { mealId: string; subtitle: string };
  AddFood: {
    mealId: string;
    subtitle: string;
    catalogFoodId: string;
    mealFoodId?: string;
  };
};

export type TabParamList = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
};
