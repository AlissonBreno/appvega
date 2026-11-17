import type { CatalogFood } from '~/modules/Food/services/catalog';
import type { Food } from '~/modules/Food/services/food';

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
  favoriteIds: Set<number>;
}) => {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  return foods.filter(food => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      food.name.trim().toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    const matchesFavorite = filter === 'all' || favoriteIds.has(food.id_food);

    return matchesQuery && matchesFavorite;
  });
};

export const formatFoodCount = (count: number) =>
  count === 1 ? '1 alimento encontrado' : `${count} alimentos encontrados`;

export const resolveCatalogFoodId = (
  catalogFoodId: string,
  name: string,
  foods: Food[],
) => {
  const idFood = Number(catalogFoodId);

  if (foods.some(item => item.id_food === idFood)) {
    return catalogFoodId;
  }

  const match = foods.find(item => item.name === name);
  return match ? String(match.id_food) : catalogFoodId;
};
