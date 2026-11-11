import { useState } from 'react';

import type { Meal, MealFood } from '~/modules/Meal/services/meal';
import { Card } from '~/components/ui/Card';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { formatKcal } from '../../formatKcal';

import styles from './styles.module.css';

const formatGrams = (grams: number) => {
  const rounded = Math.round(grams * 10) / 10;

  if (Number.isInteger(rounded)) {
    return `${rounded}g`;
  }

  return `${rounded.toFixed(1)}g`;
};

type MacroGoals = {
  carb: number;
  protein: number;
  fat: number;
};

type MealCollapseCardProps = {
  meal: Meal;
  macroGoals: MacroGoals;
  open: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onEdit: (food: MealFood) => void;
  onRemove: (food: MealFood) => void;
};

const share = (grams: number, goal: number) => (goal > 0 ? grams / goal : 0);

const MealCollapseCard = ({
  meal,
  macroGoals,
  open,
  onToggle,
  onAdd,
  onEdit,
  onRemove,
}: MealCollapseCardProps) => {
  const mealKcal = meal.foods.reduce((sum, food) => sum + food.kcal, 0);
  const mealMacros = meal.foods.reduce(
    (sum, food) => ({
      carb: sum.carb + food.carb,
      protein: sum.protein + food.protein,
      fat: sum.fat + food.fat,
    }),
    { carb: 0, protein: 0, fat: 0 },
  );
  const mealFractions = [
    share(mealMacros.carb, macroGoals.carb),
    share(mealMacros.protein, macroGoals.protein),
    share(mealMacros.fat, macroGoals.fat),
  ];
  const fractionSum = mealFractions.reduce((sum, value) => sum + value, 0);
  const mealScale = fractionSum > 1 ? 1 / fractionSum : 1;
  const mealArcs = mealFractions.map(value => Math.max(value, 0) * mealScale);
  const [revealedFoodId, setRevealedFoodId] = useState<string | null>(null);
  const segments = [
    { key: 'carb', fraction: mealArcs[0], color: 'var(--carb)' },
    { key: 'protein', fraction: mealArcs[1], color: 'var(--protein)' },
    { key: 'fat', fraction: mealArcs[2], color: 'var(--fat)' },
  ].filter(segment => segment.fraction > 0);

  return (
    <Card.Root className={styles.mealCard}>
      <Collapse.Root expanded={open} onToggle={onToggle}>
        <div className={styles.mealHeader}>
          <Collapse.Trigger
            className={styles.mealSummary}
            accessibilityLabel={`${meal.title}, ${meal.foods.length} itens`}
          >
            <span className={styles.emoji}>{meal.emoji}</span>
            <span className={styles.titleColumn}>
              <strong className={styles.title}>{meal.title}</strong>
              <span className={styles.caption}>{meal.foods.length} itens</span>
            </span>
          </Collapse.Trigger>
          <div className={styles.kcalColumn}>
            <strong className={styles.value}>{formatKcal(mealKcal)}</strong>
            <span className={styles.caption}>kcal</span>
          </div>
          <button
            className={styles.mealPlus}
            type="button"
            aria-label={`Adicionar em ${meal.title}`}
            onClick={onAdd}
          >
            <Icon name="plus" size={16} color="var(--foreground)" />
          </button>
          <Collapse.Trigger
            className={styles.collapseButton}
            accessibilityLabel={`${open ? 'Recolher' : 'Expandir'} ${meal.title}`}
          >
            <Collapse.Chevron name="refeição" />
          </Collapse.Trigger>
        </div>
        <div className={styles.macroTrack} aria-hidden>
          {segments.map(segment => (
            <i
              key={segment.key}
              style={{ flex: segment.fraction, background: segment.color }}
            />
          ))}
        </div>
        <Collapse.Panel>
          <div className={styles.foodList}>
          {meal.foods.map(food => {
            const revealed = revealedFoodId === food.id;

            return (
              <div className={styles.foodRow} key={food.id}>
                <span className={styles.foodEmoji}>{food.emoji}</span>
                <div className={styles.foodBody}>
                  <div className={styles.foodTitleRow}>
                    <strong className={styles.title}>{food.name}</strong>
                    <span className={styles.quantity}>{formatGrams(food.grams)}</span>
                  </div>
                  <div className={styles.macros}>
                    <span className={styles.macro}>
                      <span className={styles.macroLetter} style={{ color: 'var(--carb)' }}>C</span>
                      <span className={styles.macroValue}>{formatGrams(food.carb)}</span>
                    </span>
                    <span className={styles.macro}>
                      <span className={styles.macroLetter} style={{ color: 'var(--protein)' }}>P</span>
                      <span className={styles.macroValue}>{formatGrams(food.protein)}</span>
                    </span>
                    <span className={styles.macro}>
                      <span className={styles.macroLetter} style={{ color: 'var(--fat)' }}>G</span>
                      <span className={styles.macroValue}>{formatGrams(food.fat)}</span>
                    </span>
                  </div>
                </div>
                <div className={styles.kcalColumn}>
                  <strong className={styles.value}>{formatKcal(food.kcal)}</strong>
                  <span className={styles.caption}>kcal</span>
                </div>
                <button
                  className={[styles.foodGrip, revealed ? styles.foodGripHidden : null]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  aria-label={`Ações de ${food.name}`}
                  onClick={() => setRevealedFoodId(revealed ? null : food.id)}
                >
                  <Icon name="grip-lines-vertical" size={16} color="var(--secondary-text)" />
                </button>
                <div
                  className={[styles.foodActions, revealed ? styles.foodActionsRevealed : null]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    className={styles.foodAction}
                    type="button"
                    aria-label={`Editar ${food.name}`}
                    onClick={() => onEdit(food)}
                  >
                    <Icon name="pencil" size={16} color="var(--primary-text)" />
                  </button>
                  <button
                    className={`${styles.foodAction} ${styles.foodActionDelete}`}
                    type="button"
                    aria-label={`Excluir ${food.name}`}
                    onClick={() => onRemove(food)}
                  >
                    <Icon name="trash" size={16} color="var(--error)" />
                  </button>
                </div>
              </div>
            );
          })}
          {meal.foods.length > 0 ? (
            <div className={styles.subtotal}>
              <strong className={styles.title}>Subtotal</strong>
              <div className={styles.macros}>
                <span className={styles.macro}>
                  <span className={styles.macroLetter} style={{ color: 'var(--carb)' }}>C</span>
                  <span className={styles.macroValue}>{formatGrams(mealMacros.carb)}</span>
                </span>
                <span className={styles.macro}>
                  <span className={styles.macroLetter} style={{ color: 'var(--protein)' }}>P</span>
                  <span className={styles.macroValue}>{formatGrams(mealMacros.protein)}</span>
                </span>
                <span className={styles.macro}>
                  <span className={styles.macroLetter} style={{ color: 'var(--fat)' }}>G</span>
                  <span className={styles.macroValue}>{formatGrams(mealMacros.fat)}</span>
                </span>
              </div>
            </div>
          ) : null}
          </div>
        </Collapse.Panel>
      </Collapse.Root>
    </Card.Root>
  );
};

export default MealCollapseCard;
