import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';

import { GOAL_STEPS, type GoalDraft, type GoalKey } from './goalDraft';
import GoalRow from './GoalRow';
import styles from './styles.module.css';

type DailyGoalsProps = {
  draft: GoalDraft;
  weight: number;
  saving: boolean;
  changed: boolean;
  label: string;
  onChange: (key: GoalKey, value: string) => void;
  onSave: () => void;
};

type GoalRowConfig = {
  key: GoalKey;
  emoji: string;
  label: string;
  unit: string;
  totalColor: string;
};

const rows: GoalRowConfig[] = [
  {
    key: 'goal_kcal',
    emoji: '🔥',
    label: 'Calorias',
    unit: 'kcal',
    totalColor: 'var(--secondary)',
  },
  {
    key: 'goal_carb',
    emoji: '🍞',
    label: 'Carboidratos',
    unit: 'g',
    totalColor: 'var(--carb)',
  },
  {
    key: 'goal_prot',
    emoji: '🥚',
    label: 'Proteínas',
    unit: 'g',
    totalColor: 'var(--protein)',
  },
  {
    key: 'goal_fat',
    emoji: '🥑',
    label: 'Gordura',
    unit: 'g',
    totalColor: 'var(--fat)',
  },
];

const DailyGoals = ({ draft, weight, saving, changed, label, onChange, onSave }: DailyGoalsProps) => {
  const active = changed || saving;

  return (
    <Card.Root>
      <Card.SectionTitle title="🎯 Metas Diárias" />
      {rows.map(row => (
        <GoalRow
          key={row.key}
          emoji={row.emoji}
          label={row.label}
          value={draft[row.key]}
          unit={row.unit}
          goalKey={row.key}
          weightKg={weight}
          totalColor={row.totalColor}
          step={GOAL_STEPS[row.key]}
          disabled={saving}
          onChangeValue={value => onChange(row.key, value)}
        />
      ))}
      <Button.Root
        className={active ? styles.save : undefined}
        disabled={!changed || saving}
        onClick={onSave}
        accessibilityLabel={label}
      >
        <Button.Icon name="save" color={active ? 'var(--background)' : undefined} />
        <Button.Label className={active ? styles.saveLabel : undefined}>{label}</Button.Label>
      </Button.Root>
    </Card.Root>
  );
};

export default DailyGoals;
