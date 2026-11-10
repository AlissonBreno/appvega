import type { Meal, MealFood } from '~/modules/Meal/services/meal';
import { Card } from '~/components/ui/Card';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { formatKcal } from '../../formatKcal';

import styles from './styles.module.css';

type MealCollapseCardProps = {
  meal: Meal;
  goalSum: number;
  open: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onEdit: (food: MealFood) => void;
  onRemove: (food: MealFood) => void;
};

const MealCollapseCard = ({
  meal,
  goalSum,
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
  const mealFractions = [mealMacros.carb, mealMacros.protein, mealMacros.fat].map(grams =>
    goalSum === 0 ? 0 : grams / goalSum,
  );
  const fractionSum = mealFractions.reduce((sum, value) => sum + value, 0);
  const mealScale = fractionSum > 1 ? 1 / fractionSum : 1;
  const mealArcs = mealFractions.map(value => value * mealScale);

  return (
    <Card.Root className={styles.mealCard}>
      <Collapse.Root expanded={open} onToggle={onToggle}>
        <div className={styles.mealHeader}>
          <Collapse.Trigger className={styles.mealSummary}>
            <span>{meal.emoji}</span>
            <span>
              <strong>{meal.title}</strong>
              <div className="muted">{meal.foods.length} itens</div>
            </span>
            <strong className={styles.mealKcal}>{formatKcal(mealKcal)} kcal</strong>
            <Collapse.Chevron name={meal.title} />
          </Collapse.Trigger>
          <button
            className={styles.mealPlus}
            type="button"
            aria-label={`Adicionar em ${meal.title}`}
            onClick={onAdd}
          >
            <Icon name="plus" size={16} color="var(--primary)" />
          </button>
        </div>
        <div className={styles.macroTrack} aria-hidden>
          <i style={{ width: `${mealArcs[0] * 100}%`, background: 'var(--carb)' }} />
          <i style={{ width: `${mealArcs[1] * 100}%`, background: 'var(--protein)' }} />
          <i style={{ width: `${mealArcs[2] * 100}%`, background: 'var(--fat)' }} />
        </div>
        <Collapse.Panel>
          {meal.foods.map(food => (
            <div className={styles.foodRow} key={food.id}>
              <div>
                <strong>
                  {food.emoji} {food.name}
                </strong>
                <div className="muted">
                  {food.grams} g · C {food.carb} · P {food.protein} · G {food.fat}
                </div>
              </div>
              <div className={styles.foodActions}>
                <strong>{formatKcal(food.kcal)}</strong>
                <button
                  className={styles.foodAction}
                  type="button"
                  aria-label={`Editar ${food.name}`}
                  onClick={() => onEdit(food)}
                >
                  <Icon name="pencil" size={16} color="var(--primary-text)" />
                </button>
                <button
                  className={styles.foodAction}
                  type="button"
                  aria-label={`Excluir ${food.name}`}
                  onClick={() => onRemove(food)}
                >
                  <Icon name="trash" size={16} color="var(--primary-text)" />
                </button>
              </div>
            </div>
          ))}
        </Collapse.Panel>
      </Collapse.Root>
    </Card.Root>
  );
};

export default MealCollapseCard;
