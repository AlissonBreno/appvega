import type { CatalogFood, FoodFilter } from './types';

type FilterCatalogFoodsParams = {
  foods: CatalogFood[];
  query: string;
  filter: FoodFilter;
  favoriteIds: Set<string>;
};

export const filterCatalogFoods = ({
  foods,
  query,
  filter,
  favoriteIds,
}: FilterCatalogFoodsParams) => {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  return foods.filter(food => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      food.name.trim().toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    const matchesFavorite = filter === 'all' || favoriteIds.has(food.id);

    return matchesQuery && matchesFavorite;
  });
};

export const formatFoodCount = (count: number) => {
  if (count === 1) {
    return '1 alimento encontrado';
  }

  return `${count} alimentos encontrados`;
};
