import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getCatalog } from '../dados';
import { filterCatalogFoods, formatFoodCount, type FoodFilter } from '../app/filterCatalog';
import { ScreenHeader } from '../components/shared/ScreenHeader';
import { Input } from '../components/ui/Input';
import { Pill } from '../components/ui/Pill';
import Icon from '../components/ui/Icon';

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
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Back onClick={() => navigate(-1)} />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Buscar Alimento</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <div className="screen-body">
        <div className="search-bar">
          <Input.Field style={{ flex: 1 }}>
            <Input.Content>
              <Input.Icon name="search" />
              <Input.TextInput
                aria-label="Buscar alimento..."
                placeholder="Buscar alimento..."
                value={query}
                onChange={event => setQuery(event.target.value)}
              />
            </Input.Content>
          </Input.Field>
          <Pill.Root selected={filter === 'all'} onClick={() => setFilter('all')}>
            <Pill.Label>Todos</Pill.Label>
          </Pill.Root>
          <Pill.Root selected={filter === 'favorites'} onClick={() => setFilter('favorites')}>
            <Pill.Label>Favoritos</Pill.Label>
          </Pill.Root>
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
              <Icon
                name={favoriteIds.has(food.id) ? 'star' : 'star-regular'}
                size={18}
                color={favoriteIds.has(food.id) ? 'var(--fat)' : 'var(--secondary-text)'}
              />
            </span>
          </button>
        ))}
        <p>{formatFoodCount(foods.length)}</p>
      </div>
    </main>
  );
};
