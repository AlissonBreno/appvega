import Icon from '~/components/ui/Icon';

import { gramsPerKg, macroKcal, stepGoal, type GoalKey } from '../goalDraft';
import styles from './styles.module.css';

type GoalRowProps = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  goalKey: GoalKey;
  weightKg: number;
  totalColor: string;
  step: number;
  disabled: boolean;
  onChangeValue: (value: string) => void;
};

const GoalRow = ({
  emoji,
  label,
  value,
  unit,
  goalKey,
  weightKg,
  totalColor,
  step,
  disabled,
  onChangeValue,
}: GoalRowProps) => {
  const kcal = macroKcal(value, goalKey);
  const primaryCaption =
    unit === 'g' ? `${gramsPerKg(value, weightKg)} g/kg` : `${value} ${unit}`;

  return (
    <div className={styles.row}>
      <div className={styles.labelLine}>
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.title}>{label}</span>
        <div className={styles.totals}>
          <span className={styles.primaryCaption} style={{ color: totalColor }}>
            {primaryCaption}
          </span>
          {kcal !== null ? <span className={styles.secondaryCaption}>({kcal}kcal)</span> : null}
        </div>
      </div>
      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.stepButton}
          disabled={disabled}
          onClick={() => onChangeValue(stepGoal(value, -step))}
        >
          <Icon name="minus" size={14} color="var(--primary-text)" />
        </button>
        <input
          className={styles.input}
          aria-label={label}
          inputMode="decimal"
          value={value}
          disabled={disabled}
          onChange={event => onChangeValue(event.target.value)}
        />
        <button
          type="button"
          className={styles.stepButton}
          disabled={disabled}
          onClick={() => onChangeValue(stepGoal(value, step))}
        >
          <Icon name="plus" size={14} color="var(--primary-text)" />
        </button>
      </div>
    </div>
  );
};

export default GoalRow;
