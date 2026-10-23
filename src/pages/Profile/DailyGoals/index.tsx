import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import GoalRow, { type GoalRowProps } from './GoalRow';

const DailyGoals = () => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  const goals: GoalRowProps[] = [
    {
      icon: 'fire',
      label: 'Calorias',
      value: '2000',
      unit: 'kcal',
      totalColor: colors.error,
    },
    {
      icon: 'bread-slice',
      label: 'Carboidratos',
      value: '250',
      unit: 'g',
      totalColor: colors.secondary,
    },
    {
      icon: 'egg',
      label: 'Proteínas',
      value: '150',
      unit: 'g',
      totalColor: colors.primary,
    },
    {
      icon: 'cheese',
      label: 'Gordura',
      value: '65',
      unit: 'g',
      totalColor: colors.fat,
    },
  ];

  return (
    <Card.Root>
      <Card.SectionTitle title="Metas Diárias" />
      {goals.map(goal => (
        <GoalRow key={goal.label} {...goal} />
      ))}
      <Button.Root>
        <Button.Icon name="save" />
        <Button.Text>Sem alterações</Button.Text>
      </Button.Root>
    </Card.Root>
  );
};

export default DailyGoals;
