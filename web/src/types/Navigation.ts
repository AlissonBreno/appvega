export const routes = {
  home: '/',
  history: '/historico',
  profile: '/perfil',
  login: '/login',
  searchFood: '/buscar',
  addFood: '/adicionar',
  mealBatch: '/lote',
} as const;

export const tabPaths = [routes.home, routes.history, routes.profile] as const;

export const stackPaths = [routes.searchFood, routes.addFood, routes.mealBatch] as const;

type SearchFoodParams = {
  mealId: string;
  subtitle: string;
};

type AddFoodParams = SearchFoodParams & {
  catalogFoodId: string;
  mealFoodId?: string;
};

export const searchFoodPath = ({ mealId, subtitle }: SearchFoodParams) => {
  const params = new URLSearchParams({ mealId, subtitle });
  return `${routes.searchFood}?${params.toString()}`;
};

export const addFoodPath = ({ mealId, subtitle, catalogFoodId, mealFoodId }: AddFoodParams) => {
  const params = new URLSearchParams({ mealId, subtitle, catalogFoodId });

  if (mealFoodId) {
    params.set('mealFoodId', mealFoodId);
  }

  return `${routes.addFood}?${params.toString()}`;
};

export const mealBatchPath = ({ mealId, subtitle }: SearchFoodParams) => {
  const params = new URLSearchParams({ mealId, subtitle });
  return `${routes.mealBatch}?${params.toString()}`;
};
