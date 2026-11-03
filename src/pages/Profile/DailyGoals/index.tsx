import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { User } from '~/types';

import GoalRow, { type GoalRowProps } from './GoalRow';

type DailyGoalsProps = {
  user: User;
};

const DailyGoals = ({ user }: DailyGoalsProps) => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  const goals: GoalRowProps[] = [
    {
      emoji: '🔥',
      label: 'Calorias',
      value: String(user.goal_kcal),
      unit: 'kcal',
      totalColor: colors.secondary,
    },
    {
      emoji: '🍞',
      label: 'Carboidratos',
      value: String(user.goal_carb),
      unit: 'g',
      totalColor: colors.carb,
    },
    {
      emoji: '🥚',
      label: 'Proteínas',
      value: String(user.goal_prot),
      unit: 'g',
      totalColor: colors.protein,
    },
    {
      emoji: '🥑',
      label: 'Gordura',
      value: String(user.goal_fat),
      unit: 'g',
      totalColor: colors.fat,
    },
  ];

  return (
    <Card.Root>
      <Card.SectionTitle title="🎯 Metas Diárias" />
      {goals.map(goal => (
        <GoalRow key={goal.label} {...goal} />
      ))}
      <Button.Root>
        <Button.Icon name="save" />
        <Button.Label>Sem alterações</Button.Label>
      </Button.Root>
    </Card.Root>
  );
};

export default DailyGoals;
