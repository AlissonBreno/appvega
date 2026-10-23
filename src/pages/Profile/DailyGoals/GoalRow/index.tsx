import { Text, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { goalRowStyles } from './styles';

export type GoalRowProps = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  totalColor: string;
};

const GoalRow = ({ emoji, label, value, unit, totalColor }: GoalRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = goalRowStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.goalRow}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.goalCopy}>
        <Text style={styles.goalLabel}>{label}</Text>
        <Text style={[styles.goalTotal, { color: totalColor }]}>
          {value} / {value} {unit}
        </Text>
      </View>
      <View style={styles.stepper}>
        <Icon name="minus" color={theme.colors.secondaryText} size={12} />
        <Text style={styles.stepperValue}>{value}</Text>
        <Icon name="plus" color={theme.colors.secondaryText} size={12} />
      </View>
    </View>
  );
};

export default GoalRow;
