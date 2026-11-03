import { Pressable, Text, TextInput, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { stepGoalValue } from '../goalDraft';
import { goalRowStyles } from './styles';

export type GoalRowProps = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  totalColor: string;
  step: number;
  onChangeValue: (value: string) => void;
};

const GoalRow = ({
  emoji,
  label,
  value,
  unit,
  totalColor,
  step,
  onChangeValue,
}: GoalRowProps) => {
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Diminuir ${label}`}
          style={styles.stepperButton}
          onPress={() => onChangeValue(stepGoalValue(value, -step))}
        >
          <Icon name="minus" color={theme.colors.secondaryText} size={14} />
        </Pressable>
        <TextInput
          style={styles.stepperInput}
          value={value}
          onChangeText={onChangeValue}
          keyboardType="decimal-pad"
          accessibilityLabel={label}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${label}`}
          style={styles.stepperButton}
          onPress={() => onChangeValue(stepGoalValue(value, step))}
        >
          <Icon name="plus" color={theme.colors.secondaryText} size={14} />
        </Pressable>
      </View>
    </View>
  );
};

export default GoalRow;
