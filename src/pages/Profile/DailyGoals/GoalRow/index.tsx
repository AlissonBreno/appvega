import { Text, View } from 'react-native';

import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { goalRowStyles } from './styles';

export type GoalRowProps = {
  icon: IconName;
  label: string;
  value: string;
  unit: string;
  totalColor: string;
};

const GoalRow = ({ icon, label, value, unit, totalColor }: GoalRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = goalRowStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.goalRow}>
      <Icon name={icon} color={totalColor} size={18} />
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
