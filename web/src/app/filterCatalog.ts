import type { CatalogFood } from '../dados';

export type FoodFilter = 'all' | 'favorites';

export const filterCatalogFoods = ({
  foods,
  query,
  filter,
  favoriteIds,
}: {
  foods: CatalogFood[];
  query: string;
  filter: FoodFilter;
  favoriteIds: Set<string>;
}) => {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  return foods.filter(food => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      food.name.trim().toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    const matchesFavorite = filter === 'all' || favoriteIds.has(food.id);

    return matchesQuery && matchesFavorite;
  });
};

export const formatFoodCount = (count: number) =>
  count === 1 ? '1 alimento encontrado' : `${count} alimentos encontrados`;

export const resolveCatalogFoodId = (
  catalogFoodId: string,
  name: string,
  foods: CatalogFood[],
) => {
  if (foods.some(item => item.id === catalogFoodId)) {
    return catalogFoodId;
  }

  return foods.find(item => item.name === name)?.id ?? catalogFoodId;
};
