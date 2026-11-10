import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import MacroColumn from '~/components/shared/MacroColumn';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { Pill } from '~/components/ui/Pill';
import type { MealFlowPresentation } from '~/config/viewport';
import { useMealsData } from '~/contexts/MealsDataContext';
import { useSelectedDate } from '~/hooks/useSelectedDate';
import { useToast } from '~/hooks/useToast';
import { getCatalog } from '~/modules/Food/services/catalog';
import { addMealFoodEntry, getMealsWithFoods, updateMealFoodEntry } from '~/modules/Meal/services/meal';
import { scalePortion } from '~/modules/Meal/utils/portion';
import { getUser } from '~/modules/User/services/user';
import { routes } from '~/types/Navigation';
import { addFoodSaveDestination } from './navigation';
import {
  decreaseGrams,
  formatFact,
  formatGrams,
  gramsAtLeastTen,
} from './quantity';
import styles from './styles.module.css';

const PILLS = [50, 100, 150, 200, 250, 300];

const MACRO_COLUMNS = [
  { key: 'carb', emoji: '🍞', label: 'Carboidratos', goalKey: 'goal_carb', color: 'var(--carb)' },
  { key: 'protein', emoji: '🍗', label: 'Proteínas', goalKey: 'goal_prot', color: 'var(--protein)' },
  { key: 'fat', emoji: '🥑', label: 'Gorduras', goalKey: 'goal_fat', color: 'var(--fat)' },
] as const;

type AddFoodProps = {
  onBack?: () => void;
  onClose?: () => void;
  embedded?: boolean;
  presentation?: MealFlowPresentation;
};

const AddFood = ({
  onBack,
  onClose,
  embedded = false,
  presentation = 'page',
}: AddFoodProps) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { selectedDate } = useSelectedDate();
  const { markMealsChanged } = useMealsData();
  const { showToast } = useToast();
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const catalogFoodId = params.get('catalogFoodId') ?? '';
  const mealFoodId = params.get('mealFoodId');
  const food = getCatalog().find(item => item.id === catalogFoodId);
  const [grams, setGrams] = useState(100);
  const [ready, setReady] = useState(!mealFoodId);

  useEffect(() => {
    if (!mealFoodId) {
      return;
    }

    let active = true;
    getMealsWithFoods(selectedDate).then(meals => {
      const current = meals.flatMap(meal => meal.foods).find(item => item.id === mealFoodId);
      if (active && current) {
        setGrams(current.grams);
      }
      if (active) {
        setReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [mealFoodId, selectedDate]);

  useEffect(() => {
    if (!food) {
      navigate(-1);
    }
  }, [food, navigate]);

  if (!food || !ready) {
    return null;
  }

  const portion = scalePortion(food, grams);
  const user = getUser();
  const actionLabel = mealFoodId ? 'SALVAR NA REFEIÇÃO' : 'ADICIONAR À REFEIÇÃO';
  const macros = {
    carb: portion.carb,
    protein: portion.protein,
    fat: portion.fat,
  };

  const confirm = async () => {
    const entry = {
      id: mealFoodId ?? `${food.id}-${Date.now()}`,
      catalogFoodId: food.id,
      name: food.name,
      emoji: food.emoji,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    };

    const saveDestination = addFoodSaveDestination(presentation, Boolean(mealFoodId));

    if (mealFoodId) {
      await updateMealFoodEntry(mealId, entry, selectedDate);
      markMealsChanged();
      showToast({ message: 'Alteração realizada com sucesso', variant: 'success' });
    } else {
      await addMealFoodEntry(mealId, entry, selectedDate);
      markMealsChanged();
      showToast({ message: 'Inclusão realizada com sucesso', variant: 'success' });
    }

    if (saveDestination === 'home') {
      navigate(routes.home);
      return;
    }

    navigate(-1);
  };

  return (
    <main
      className={[styles.screen, embedded ? styles.screenEmbedded : styles.screenPage].join(' ')}
    >
      <div className={styles.chrome}>
        <ScreenHeader.Root>
          <ScreenHeader.Row>
            {onBack ? (
              <ScreenHeader.Back
                onClick={onBack}
                className={styles.headerButton}
                iconSize={20}
              />
            ) : null}
            <ScreenHeader.TextColumn>
              <ScreenHeader.Title>Adicionando em</ScreenHeader.Title>
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
        <section className={styles.identity}>
          <span className={styles.emoji} aria-hidden>
            {food.emoji}
          </span>
          <div>
            <h1 className={styles.name}>{food.name}</h1>
          </div>
        </section>

        <section className={styles.kcalBox}>
          <p className={styles.kcalValue}>{portion.kcal}</p>
          <p className={styles.kcalLabel}>kcal</p>
        </section>

        <section className={styles.macros}>
          {MACRO_COLUMNS.map(column => (
            <MacroColumn
              key={column.key}
              emoji={column.emoji}
              grams={macros[column.key]}
              goal={user[column.goalKey]}
              color={column.color}
              caption={column.label}
            />
          ))}
        </section>

        <Collapse.Root>
          <div className={styles.table}>
            <Collapse.Trigger className={styles.tableHeader}>
              <p className={styles.tableTitle}>Tabela Nutricional</p>
              <Collapse.Chevron name="tabela nutricional" />
            </Collapse.Trigger>
            <Collapse.Panel>
              {portion.facts.map(fact => (
                <div key={fact.label} className={styles.factRow}>
                  <p className={styles.factLabel}>{fact.label}</p>
                  <p className={styles.factValue}>{formatFact(fact)}</p>
                </div>
              ))}
            </Collapse.Panel>
          </div>
        </Collapse.Root>

        <section className={styles.quantity}>
          <h2 className={styles.quantityTitle}>Quantidade em gramas</h2>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Diminuir 10 gramas"
              disabled={!gramsAtLeastTen(grams)}
              onClick={() => setGrams(decreaseGrams(grams))}
            >
              <Icon name="minus" size={14} color="var(--secondary-text)" />
            </button>
            <p className={styles.grams}>{formatGrams(grams)}</p>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Aumentar 10 gramas"
              onClick={() => setGrams(grams + 10)}
            >
              <Icon name="plus" size={14} color="var(--secondary-text)" />
            </button>
          </div>
          <div className={styles.shortcuts}>
            {PILLS.map(pill => (
              <Pill.Root
                key={pill}
                selected={grams === pill}
                accessibilityLabel={`${pill} gramas`}
                onClick={() => setGrams(pill)}
              >
                <Pill.Label>{pill}g</Pill.Label>
              </Pill.Root>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button.Root
          className={styles.confirm}
          accessibilityLabel={actionLabel}
          onClick={confirm}
        >
          <Button.Icon name="plus" color="var(--background)" />
          <Button.Label className={styles.confirmLabel}>{actionLabel}</Button.Label>
        </Button.Root>
      </div>
    </main>
  );
};

export default AddFood;
