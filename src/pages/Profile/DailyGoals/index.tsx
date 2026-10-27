import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import GoalRow, { type GoalRowProps } from './GoalRow';

const DailyGoals = () => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  const goals: GoalRowProps[] = [
    {
      emoji: '🔥',
      label: 'Calorias',
      value: '2000',
      unit: 'kcal',
      totalColor: colors.secondary,
    },
    {
      emoji: '🍞',
      label: 'Carboidratos',
      value: '250',
      unit: 'g',
      totalColor: colors.carb,
    },
    {
      emoji: '🥚',
      label: 'Proteínas',
      value: '150',
      unit: 'g',
      totalColor: colors.protein,
    },
    {
      emoji: '🥑',
      label: 'Gordura',
      value: '65',
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
