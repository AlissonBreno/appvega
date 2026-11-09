import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getCatalog } from '../dados';
import { filterCatalogFoods, formatFoodCount, type FoodFilter } from '../app/filterCatalog';

export const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const catalog = useMemo(() => getCatalog(), []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FoodFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(catalog.filter(food => food.favorite).map(food => food.id)),
  );
  const foods = filterCatalogFoods({ foods: catalog, query, filter, favoriteIds });

  return (
    <main>
      <header className="screen-header">
        <button className="btn" type="button" onClick={() => navigate(-1)}>Voltar</button>
        <h1 className="screen-title">Buscar Alimento</h1>
        <p className="screen-subtitle">{subtitle}</p>
      </header>
      <div className="screen-body">
        <div className="search-bar">
          <input
            className="field-box"
            aria-label="Buscar alimento..."
            placeholder="Buscar alimento..."
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Todos</button>
          <button type="button" aria-pressed={filter === 'favorites'} onClick={() => setFilter('favorites')}>Favoritos</button>
        </div>
        {foods.map(food => (
          <button
            key={food.id}
            className="food-row"
            type="button"
            onClick={() =>
              navigate(
                `/adicionar?mealId=${mealId}&subtitle=${encodeURIComponent(subtitle)}&catalogFoodId=${food.id}`,
              )
            }
          >
            <span>
              {food.emoji} {food.name}
              <div className="muted">
                {food.kcal} kcal · 100g · C {food.carb} · P {food.protein} · G {food.fat}
              </div>
            </span>
            <span
              role="button"
              aria-label={favoriteIds.has(food.id) ? `Remover ${food.name} dos favoritos` : `Favoritar ${food.name}`}
              onClick={event => {
                event.stopPropagation();
                setFavoriteIds(current => {
                  const next = new Set(current);
                  if (next.has(food.id)) {
                    next.delete(food.id);
                  } else {
                    next.add(food.id);
                  }
                  return next;
                });
              }}
            >
              {favoriteIds.has(food.id) ? '★' : '☆'}
            </span>
          </button>
        ))}
        <p>{formatFoodCount(foods.length)}</p>
      </div>
    </main>
  );
};
