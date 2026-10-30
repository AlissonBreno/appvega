import { catalog } from './catalog';
import { filterCatalogFoods, formatFoodCount } from './filterCatalogFoods';

const favoriteIds = new Set(
  catalog.filter(food => food.favorite).map(food => food.id),
);

describe('filterCatalogFoods', () => {
  test('returns the full catalog when there is no query', () => {
    expect(
      filterCatalogFoods({
        foods: catalog,
        query: '',
        filter: 'all',
        favoriteIds,
      }),
    ).toEqual(catalog);

    expect(
      filterCatalogFoods({
        foods: catalog,
        query: '   ',
        filter: 'all',
        favoriteIds,
      }),
    ).toEqual(catalog);
  });

  test('matches case and keeps accents', () => {
    expect(
      filterCatalogFoods({
        foods: catalog,
        query: 'AVEIA',
        filter: 'all',
        favoriteIds,
      }).map(food => food.name),
    ).toEqual(['Aveia']);

    expect(
      filterCatalogFoods({
        foods: catalog,
        query: 'maca',
        filter: 'all',
        favoriteIds,
      }),
    ).toEqual([]);

    expect(
      filterCatalogFoods({
        foods: catalog,
        query: 'Maçã',
        filter: 'all',
        favoriteIds,
      }).map(food => food.id),
    ).toEqual(['maca']);
  });

  test('returns the four initial favorites in catalog order', () => {
    expect(
      filterCatalogFoods({
        foods: catalog,
        query: '',
        filter: 'favorites',
        favoriteIds,
      }).map(food => food.id),
    ).toEqual(['aveia', 'iogurte-grego', 'peito-de-frango', 'ovo-cozido']);
  });

  test('searches inside favorites', () => {
    expect(
      filterCatalogFoods({
        foods: catalog,
        query: 'frango',
        filter: 'favorites',
        favoriteIds,
      }).map(food => food.id),
    ).toEqual(['peito-de-frango']);

    expect(
      filterCatalogFoods({
        foods: catalog,
        query: 'banana',
        filter: 'favorites',
        favoriteIds,
      }),
    ).toEqual([]);
  });
});

describe('formatFoodCount', () => {
  test('pluralizes 0, 1 and 11', () => {
    expect(formatFoodCount(0)).toBe('0 alimentos encontrados');
    expect(formatFoodCount(1)).toBe('1 alimento encontrado');
    expect(formatFoodCount(11)).toBe('11 alimentos encontrados');
  });
});
