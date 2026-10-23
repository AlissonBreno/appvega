import { Text, View } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { styles } from './styles';

type GoalRowProps = {
  icon: IconName;
  label: string;
  value: string;
  unit: string;
  totalColor: string;
};

const GoalRow = ({ icon, label, value, unit, totalColor }: GoalRowProps) => {
  const { theme } = useNavigationTheme();
  const { colors, fonts } = theme;

  return (
    <View style={styles.goalRow}>
      <Icon name={icon} color={totalColor} size={18} />
      <View style={styles.goalCopy}>
        <Text style={[styles.goalLabel, fonts.medium, { color: colors.primaryText }]}>
          {label}
        </Text>
        <Text style={[styles.goalTotal, fonts.light, { color: totalColor }]}>
          {value} / {value} {unit}
        </Text>
      </View>
      <View style={[styles.stepper, { borderColor: colors.border }]}>
        <Icon name="minus" color={colors.secondaryText} size={12} />
        <Text
          style={[styles.stepperValue, fonts.light, { color: colors.primaryText }]}
        >
          {value}
        </Text>
        <Icon name="plus" color={colors.secondaryText} size={12} />
      </View>
    </View>
  );
};

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
