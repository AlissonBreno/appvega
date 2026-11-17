import type { Food } from '../../../../../app/src/modules/Food/types/Food';
import { getFoods } from './food';

export type CatalogFood = Food & { favorite: boolean };

export const getCatalog = (favoriteIds: ReadonlySet<number>): CatalogFood[] =>
  getFoods().map(food => ({
    ...food,
    favorite: favoriteIds.has(food.id_food),
  }));
