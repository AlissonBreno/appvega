import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import Icon from '~/components/ui/Icon';
import { Input } from '~/components/ui/Input';
import { Pill } from '~/components/ui/Pill';
import { getCatalog } from '~/modules/Food/services/catalog';
import { addFoodPath } from '~/types/Navigation';
import { filterCatalogFoods, formatFoodCount, type FoodFilter } from './filterCatalogFoods';
import styles from './styles.module.css';

type SearchFoodProps = {
  onBack: () => void;
  onClose?: () => void;
  embedded?: boolean;
};

const SearchFood = ({ onBack, onClose, embedded = false }: SearchFoodProps) => {
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
    <main
      className={[styles.screen, embedded ? styles.screenEmbedded : styles.screenPage].join(' ')}
    >
      <div className={styles.chrome}>
        <ScreenHeader.Root>
          <ScreenHeader.Row>
            <ScreenHeader.Back
              onClick={onBack}
              className={styles.headerButton}
              iconSize={20}
            />
            <ScreenHeader.TextColumn>
              <ScreenHeader.Title>Buscar Alimento</ScreenHeader.Title>
              <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
            </ScreenHeader.TextColumn>
            {onClose ? (
              <ScreenHeader.Close
                onClick={onClose}
                className={styles.headerButton}
                iconSize={20}
              />
            ) : null}
          </ScreenHeader.Row>
        </ScreenHeader.Root>
        <div className={styles.filters}>
          <Input.Field className={styles.search}>
            <Input.Content className={styles.searchContent}>
              <Input.Icon name="search" />
              <Input.TextInput
                aria-label="Buscar alimento..."
                placeholder="Buscar alimento..."
                value={query}
                onChange={event => setQuery(event.target.value)}
              />
            </Input.Content>
          </Input.Field>
          <div className={styles.pills}>
            <Pill.Root selected={filter === 'all'} onClick={() => setFilter('all')}>
              <Pill.Label>Todos</Pill.Label>
            </Pill.Root>
            <Pill.Root selected={filter === 'favorites'} onClick={() => setFilter('favorites')}>
              <Icon name="star" size={12} color="var(--fat)" />
              <Pill.Label>Favoritos</Pill.Label>
            </Pill.Root>
          </div>
        </div>
      </div>
      <div className={styles.listCard}>
        {foods.map(food => {
          const isFavorite = favoriteIds.has(food.id);

          return (
            <button
              key={food.id}
              className={styles.foodRow}
              type="button"
              onClick={() =>
                navigate(addFoodPath({ mealId, subtitle, catalogFoodId: food.id }))
              }
            >
              <span className={styles.foodEmoji} aria-hidden>
                {food.emoji}
              </span>
              <span className={styles.foodBody}>
                <span className={styles.foodName}>{food.name}</span>
                <span className={styles.foodMeta}>
                  <span className={styles.foodKcal}>{food.kcal}</span>
                  {' kcal · '}
                  <span className={styles.foodCarb}>C</span> {food.carb}
                  {' · '}
                  <span className={styles.foodProtein}>P</span> {food.protein}
                  {' · '}
                  <span className={styles.foodFat}>G</span> {food.fat}
                </span>
              </span>
              <span
                className={styles.foodFavorite}
                role="button"
                aria-label={
                  isFavorite ? `Remover ${food.name} dos favoritos` : `Favoritar ${food.name}`
                }
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
                  name={isFavorite ? 'star' : 'star-regular'}
                  size={18}
                  color={isFavorite ? 'var(--fat)' : 'var(--secondary-text)'}
                />
              </span>
            </button>
          );
        })}
        <p className={styles.foodCount}>{formatFoodCount(foods.length)}</p>
      </div>
    </main>
  );
};

export default SearchFood;
