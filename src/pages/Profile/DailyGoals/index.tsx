import { useState, type RefObject } from 'react';
import { ActivityIndicator, type TextInput } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useToast } from '~/hooks/useToast';
import { updateUserGoals } from '~/modules/User/services/user';
import type { User } from '~/types';

import GoalRow from './GoalRow';
import {
  GOAL_STEPS,
  hasGoalChanges,
  parseGoalDraft,
  toGoalDraft,
  type GoalDraft,
  type GoalKey,
  type GoalValues,
} from './goalDraft';
import { dailyGoalsStyles } from './styles';

type DailyGoalsProps = {
  user: User;
  onUserUpdated: (user: User) => void;
  onFocusGoalInput: (inputRef: RefObject<TextInput | null>) => void;
};

const goalsFromUser = (user: User): GoalValues => ({
  goal_kcal: user.goal_kcal,
  goal_carb: user.goal_carb,
  goal_prot: user.goal_prot,
  goal_fat: user.goal_fat,
});

type GoalRowConfig = {
  key: GoalKey;
  emoji: string;
  label: string;
  unit: string;
  totalColor: string;
};

const DailyGoals = ({
  user,
  onUserUpdated,
  onFocusGoalInput,
}: DailyGoalsProps) => {
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = dailyGoalsStyles[isDark ? 'dark' : 'light'];
  const { showToast } = useToast();

  const [saved, setSaved] = useState<GoalValues>(() => goalsFromUser(user));
  const [draft, setDraft] = useState<GoalDraft>(() =>
    toGoalDraft(goalsFromUser(user)),
  );
  const [isSaving, setIsSaving] = useState(false);

  const canSave = hasGoalChanges(draft, saved);
  const isSaveActive = canSave || isSaving;

  const handleChange = (key: GoalKey, value: string) => {
    setDraft(current => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    const parsed = parseGoalDraft(draft);

    if (parsed === null) {
      return;
    }

    setIsSaving(true);

    try {
      const updated = await updateUserGoals(parsed);
      const nextSaved = goalsFromUser(updated);

      setSaved(nextSaved);
      setDraft(toGoalDraft(nextSaved));
      onUserUpdated(updated);
      showToast({
        message: 'alterações salvas!',
        variant: 'success',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const goals: GoalRowConfig[] = [
    {
      key: 'goal_kcal',
      emoji: '🔥',
      label: 'Calorias',
      unit: 'kcal',
      totalColor: colors.secondary,
    },
    {
      key: 'goal_carb',
      emoji: '🍞',
      label: 'Carboidratos',
      unit: 'g',
      totalColor: colors.carb,
    },
    {
      key: 'goal_prot',
      emoji: '🥚',
      label: 'Proteínas',
      unit: 'g',
      totalColor: colors.protein,
    },
    {
      key: 'goal_fat',
      emoji: '🥑',
      label: 'Gordura',
      unit: 'g',
      totalColor: colors.fat,
    },
  ];

  return (
    <Card.Root>
      <Card.SectionTitle title="🎯 Metas Diárias" />
      {goals.map(goal => (
        <GoalRow
          key={goal.key}
          emoji={goal.emoji}
          label={goal.label}
          value={draft[goal.key]}
          unit={goal.unit}
          goalKey={goal.key}
          weightKg={user.weight}
          totalColor={goal.totalColor}
          step={GOAL_STEPS[goal.key]}
          onChangeValue={
            isSaving ? () => undefined : value => handleChange(goal.key, value)
          }
          onFocusInput={onFocusGoalInput}
        />
      ))}
      <Button.Root
        onPress={canSave && !isSaving ? handleSave : undefined}
        style={isSaveActive ? styles.save : undefined}
      >
        {isSaving ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Button.Icon
            name="save"
            color={isSaveActive ? colors.background : undefined}
          />
        )}
        <Button.Label style={isSaveActive ? styles.saveLabel : undefined}>
          {isSaving
            ? 'Salvando...'
            : canSave
              ? 'Salvar alterações'
              : 'Sem alterações'}
        </Button.Label>
      </Button.Root>
    </Card.Root>
  );
};

export default DailyGoals;
