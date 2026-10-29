import { Text, TextInput, View } from 'react-native';

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
      <View style={styles.goalRowLabel}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.goalLabel}>{label}</Text>
        <Text style={[styles.goalTotal, { color: totalColor }]}>
          {value} {unit}
        </Text>
      </View>
      <View style={styles.stepper}>
        <View style={styles.stepperButton}>
          <Icon name="minus" color={theme.colors.secondaryText} size={14} />
        </View>
        <TextInput style={styles.stepperInput} value={value} editable={false} />
        <View style={styles.stepperButton}>
          <Icon name="plus" color={theme.colors.secondaryText} size={14} />
        </View>
      </View>
    </View>
  );
};

export default GoalRow;
