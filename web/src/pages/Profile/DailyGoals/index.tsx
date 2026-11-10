import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import loginStyles from '~/pages/Login/styles.module.css';
import { GOAL_STEPS, gramsPerKg, macroKcal, stepGoal, type GoalDraft, type GoalKey } from './goalDraft';

const rows: { key: GoalKey; emoji: string; label: string }[] = [
  { key: 'goal_kcal', emoji: '🔥', label: 'Calorias' },
  { key: 'goal_carb', emoji: '🍞', label: 'Carboidratos' },
  { key: 'goal_prot', emoji: '🍗', label: 'Proteínas' },
  { key: 'goal_fat', emoji: '🥑', label: 'Gorduras' },
];

type DailyGoalsProps = {
  draft: GoalDraft;
  weight: number;
  saving: boolean;
  changed: boolean;
  label: string;
  onChange: (key: GoalKey, value: string) => void;
  onSave: () => void;
};

const DailyGoals = ({ draft, weight, saving, changed, label, onChange, onSave }: DailyGoalsProps) => (
  <Card.Root>
    {rows.map(row => (
      <div key={row.key} className="goal-row">
        <span>
          {row.emoji} {row.label}
        </span>
        {row.key !== 'goal_kcal' ? (
          <span className="muted">
            {gramsPerKg(draft[row.key], weight)} g/kg ({macroKcal(draft[row.key], row.key)}kcal)
          </span>
        ) : null}
        <div className="goal-controls">
          <button
            type="button"
            disabled={saving}
            onClick={() => onChange(row.key, stepGoal(draft[row.key], -GOAL_STEPS[row.key]))}
          >
            −
          </button>
          <input
            aria-label={row.label}
            inputMode="decimal"
            disabled={saving}
            value={draft[row.key]}
            onChange={event => onChange(row.key, event.target.value)}
          />
          <button
            type="button"
            disabled={saving}
            onClick={() => onChange(row.key, stepGoal(draft[row.key], GOAL_STEPS[row.key]))}
          >
            +
          </button>
        </div>
      </div>
    ))}
    <Button.Root className={loginStyles.signIn} disabled={!changed || saving} onClick={onSave}>
      <Button.Label className={loginStyles.signInLabel}>{label}</Button.Label>
    </Button.Root>
  </Card.Root>
);

export default DailyGoals;
