import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import MacroColumn from '~/components/shared/MacroColumn';
import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { Input } from '~/components/ui/Input';
import { Pill } from '~/components/ui/Pill';
import type { MealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useMealsData } from '~/contexts/MealsDataContext';
import { useSelectedDate } from '~/hooks/useSelectedDate';
import { useToast } from '~/hooks/useToast';
import { getCatalog } from '~/modules/Food/services/catalog';
import { getMealsWithFoods, updateMealFoodEntry } from '~/modules/Meal/services/meal';
import { scalePortion } from '~/modules/Meal/utils/portion';
import { getUser } from '~/modules/User/services/user';
import { mealBatchPath, routes } from '~/types/Navigation';
import { gramsAreValid, portionScreenMode } from './batchActions';
import { addFoodSaveDestination } from './navigation';
import {
  decreaseGrams,
  formatFact,
  gramsAtLeastTen,
  parseGramsInput,
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
  const { addItem } = useMealBatch();
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const catalogFoodId = params.get('catalogFoodId') ?? '';
  const mealFoodId = params.get('mealFoodId');
  const food = getCatalog().find(item => item.id === catalogFoodId);
  const [grams, setGrams] = useState(100);
  const [gramsText, setGramsText] = useState('100');
  const [ready, setReady] = useState(!mealFoodId);

  const updateGrams = (next: number) => {
    setGrams(next);
    setGramsText(String(next));
  };
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyThumbRef = useRef<HTMLSpanElement>(null);
  const bodyScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (bodyScrollTimer.current) {
      clearTimeout(bodyScrollTimer.current);
    }
  }, []);

  const onBodyScroll = () => {
    const body = bodyRef.current;
    const thumb = bodyThumbRef.current;

    if (!body || !thumb) {
      return;
    }

    if (body.scrollHeight <= body.clientHeight + 1) {
      thumb.hidden = true;
      return;
    }

    const inset = 8;
    const track = body.clientHeight - inset * 2;
    const height = Math.max(28, (body.clientHeight / body.scrollHeight) * track);
    const maxTop = Math.max(track - height, 0);
    const top = inset + (body.scrollTop / (body.scrollHeight - body.clientHeight)) * maxTop;

    thumb.hidden = false;
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${top}px)`;

    if (bodyScrollTimer.current) {
      clearTimeout(bodyScrollTimer.current);
    }

    bodyScrollTimer.current = setTimeout(() => {
      thumb.hidden = true;
    }, 700);
  };

  useEffect(() => {
    if (!mealFoodId) {
      return;
    }

    let active = true;
    getMealsWithFoods(selectedDate).then(meals => {
      const current = meals.flatMap(meal => meal.foods).find(item => item.id === mealFoodId);
      if (active && current) {
        setGrams(current.grams);
        setGramsText(String(current.grams));
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
  const mode = portionScreenMode(Boolean(mealFoodId));
  const macros = {
    carb: portion.carb,
    protein: portion.protein,
    fat: portion.fat,
  };

  const addToBatch = () => {
    if (!gramsAreValid(grams)) {
      return;
    }

    addItem(mealId, {
      id: `${food.id}-${Date.now()}`,
      catalogFoodId: food.id,
      name: food.name,
      emoji: food.emoji,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    });
    navigate(mealBatchPath({ mealId, subtitle }));
  };

  const saveEdit = async () => {
    if (!mealFoodId) {
      return;
    }

    const entry = {
      id: mealFoodId,
      catalogFoodId: food.id,
      name: food.name,
      emoji: food.emoji,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    };

    const saveDestination = addFoodSaveDestination(presentation, true);

    await updateMealFoodEntry(mealId, entry, selectedDate);
    markMealsChanged();
    showToast({ message: 'Alteração realizada com sucesso', variant: 'success' });

    if (saveDestination === 'home') {
      navigate(routes.home);
      return;
    }

    navigate(-1);
  };

  const actionLabel =
    mode === 'edit' ? 'SALVAR NA REFEIÇÃO' : 'ADICIONAR';
  const onAction = mode === 'edit' ? saveEdit : addToBatch;

  const confirmButton = (
    <div className={styles.actions}>
      <Button.Root
        className={styles.confirm}
        accessibilityLabel={actionLabel}
        onClick={onAction}
      >
        <Button.Icon name="plus" color="var(--background)" />
        <Button.Label className={styles.confirmLabel}>{actionLabel}</Button.Label>
      </Button.Root>
    </div>
  );

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

      <div className={styles.bodyFrame}>
      <div ref={bodyRef} className={styles.body} onScroll={onBodyScroll}>
        <section className={styles.summary}>
          <div className={styles.identity}>
            <span className={styles.emoji} aria-hidden>
              {food.emoji}
            </span>
            <div>
              <h1 className={styles.name}>{food.name}</h1>
            </div>
          </div>

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
        </section>

        <section className={styles.quantity}>
          <h2 className={styles.quantityTitle}>Quantidade em gramas</h2>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Diminuir 10 gramas"
              disabled={!gramsAtLeastTen(grams)}
              onClick={() => updateGrams(decreaseGrams(grams))}
            >
              <Icon name="minus" size={14} color="var(--secondary-text)" />
            </button>
            <Input.Field className={styles.gramsField}>
              <Input.Content className={styles.gramsContent}>
                <Input.TextInput
                  className={styles.gramsInput}
                  aria-label="Quantidade em gramas"
                  inputMode="decimal"
                  value={gramsText}
                  onChange={event => {
                    const next = event.target.value;
                    setGramsText(next);
                    const parsed = parseGramsInput(next);
                    if (parsed != null) {
                      setGrams(parsed);
                    }
                  }}
                  onBlur={() => {
                    const parsed = parseGramsInput(gramsText);
                    if (parsed == null) {
                      setGramsText(String(grams));
                      return;
                    }
                    updateGrams(parsed);
                  }}
                />
              </Input.Content>
            </Input.Field>
            <button
              type="button"
              className={styles.stepperButton}
              aria-label="Aumentar 10 gramas"
              onClick={() => updateGrams(grams + 10)}
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
                onClick={() => updateGrams(pill)}
              >
                <Pill.Label>{pill}g</Pill.Label>
              </Pill.Root>
            ))}
          </div>
        </section>

        {presentation === 'page' ? <div className={styles.footer}>{confirmButton}</div> : null}
      </div>
      <span ref={bodyThumbRef} aria-hidden hidden className={styles.scrollThumb} />
      </div>
      {presentation === 'dialog' ? <div className={styles.footerStatic}>{confirmButton}</div> : null}
    </main>
  );
};

export default AddFood;
