import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import Icon from '~/components/ui/Icon';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useMealsData } from '~/contexts/MealsDataContext';
import { useSelectedDate } from '~/hooks/useSelectedDate';
import { useToast } from '~/hooks/useToast';
import { getCatalog } from '~/modules/Food/services/catalog';
import { addMealFoodEntry } from '~/modules/Meal/services/meal';
import { scalePortion } from '~/modules/Meal/utils/portion';
import { routes, searchFoodPath } from '~/types/Navigation';
import { batchTotals, commitBatch } from '../AddFood/batchActions';
import { formatOneDecimal, parseGramsInput } from '../AddFood/quantity';
import styles from './styles.module.css';

type MealBatchProps = {
  onBack: () => void;
  onClose?: () => void;
  embedded?: boolean;
};

type BatchRowProps = {
  mealId: string;
  food: ReturnType<ReturnType<typeof useMealBatch>['items']>[number];
};

const BatchRow = ({ mealId, food }: BatchRowProps) => {
  const { updateItem, removeItem } = useMealBatch();
  const [gramsText, setGramsText] = useState(String(food.grams));

  const applyGrams = (grams: number) => {
    const base = getCatalog().find(item => item.id === food.catalogFoodId);

    if (!base) {
      return;
    }

    const portion = scalePortion(base, grams);
    updateItem(mealId, {
      ...food,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    });
  };

  return (
    <li className={styles.row}>
      <span className={styles.rowEmoji} aria-hidden>
        {food.emoji}
      </span>
      <div className={styles.rowInfo}>
        <p className={styles.rowName}>{food.name}</p>
        <p className={styles.rowKcal}>{food.kcal} kcal</p>
      </div>
      <label className={styles.gramsLabel}>
        <input
          className={styles.gramsInput}
          aria-label={`Quantidade em gramas de ${food.name}`}
          inputMode="decimal"
          value={gramsText}
          onChange={event => {
            const next = event.target.value;
            setGramsText(next);
            const parsed = parseGramsInput(next);
            if (parsed != null) {
              applyGrams(parsed);
            }
          }}
          onBlur={() => {
            const parsed = parseGramsInput(gramsText);
            setGramsText(parsed == null ? String(food.grams) : String(parsed));
          }}
        />
        <span className={styles.gramsUnit}>g</span>
      </label>
      <button
        type="button"
        className={styles.removeButton}
        aria-label={`Remover ${food.name}`}
        onClick={() => removeItem(mealId, food.id)}
      >
        <Icon name="trash" size={14} color="var(--secondary-text)" />
      </button>
    </li>
  );
};

const MealBatch = ({ onBack, onClose, embedded = false }: MealBatchProps) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { selectedDate } = useSelectedDate();
  const { markMealsChanged } = useMealsData();
  const { showToast } = useToast();
  const { items, clear } = useMealBatch();
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const foods = items(mealId);
  const totals = batchTotals(foods);
  const [startedEmpty] = useState(foods.length === 0);
  const [saving, setSaving] = useState(false);

  const goToSearch = () => navigate(searchFoodPath({ mealId, subtitle }));

  useEffect(() => {
    if (startedEmpty) {
      navigate(searchFoodPath({ mealId, subtitle }));
    }
  }, [startedEmpty, navigate, mealId, subtitle]);

  useEffect(() => {
    if (!startedEmpty && foods.length === 0 && !saving) {
      navigate(searchFoodPath({ mealId, subtitle }));
    }
  }, [startedEmpty, foods.length, saving, navigate, mealId, subtitle]);

  const confirm = async () => {
    setSaving(true);

    try {
      await commitBatch(foods, food => addMealFoodEntry(mealId, food, selectedDate));
      clear(mealId);
      markMealsChanged();
      showToast({ message: 'Inclusão realizada com sucesso', variant: 'success' });
      navigate(routes.home);
    } catch {
      showToast({ message: 'Não foi possível salvar o lote', variant: 'danger' });
      setSaving(false);
    }
  };

  if (foods.length === 0) {
    return null;
  }

  const summary = [
    { label: 'kcal', value: String(totals.kcal) },
    { label: 'Carboidratos', value: `${formatOneDecimal(totals.carb)}g`, color: 'var(--carb)' },
    { label: 'Proteínas', value: `${formatOneDecimal(totals.protein)}g`, color: 'var(--protein)' },
    { label: 'Gorduras', value: `${formatOneDecimal(totals.fat)}g`, color: 'var(--fat)' },
  ];

  return (
    <main
      className={[styles.screen, embedded ? styles.screenEmbedded : styles.screenPage].join(' ')}
    >
      <div className={styles.chrome}>
        <ScreenHeader.Root>
          <ScreenHeader.Row>
            <ScreenHeader.Back onClick={onBack} className={styles.headerButton} iconSize={20} />
            <ScreenHeader.TextColumn>
              <ScreenHeader.Title>Confirmar lote</ScreenHeader.Title>
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
      </div>

      <div className={styles.body}>
        <section className={styles.totals} aria-label="Totais do lote">
          {summary.map(item => (
            <div key={item.label} className={styles.total}>
              <p
                className={styles.totalValue}
                style={item.color ? { color: item.color } : undefined}
              >
                {item.value}
              </p>
              <p className={styles.totalLabel}>{item.label}</p>
            </div>
          ))}
        </section>

        <ul className={styles.list}>
          {foods.map(food => (
            <BatchRow key={food.id} mealId={mealId} food={food} />
          ))}
        </ul>
      </div>

      <div className={styles.footer}>
        <Button.Root
          className={styles.confirm}
          accessibilityLabel="Confirmar lote"
          disabled={saving}
          onClick={confirm}
        >
          <Button.Label className={styles.confirmLabel}>Confirmar lote</Button.Label>
        </Button.Root>
        <Button.Root
          className={styles.secondary}
          accessibilityLabel="Adicionar mais alimentos"
          disabled={saving}
          onClick={goToSearch}
        >
          <Button.Label className={styles.secondaryLabel}>Adicionar mais alimentos</Button.Label>
        </Button.Root>
      </div>
    </main>
  );
};

export default MealBatch;
