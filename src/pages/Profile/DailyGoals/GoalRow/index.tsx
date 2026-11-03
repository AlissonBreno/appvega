import { useRef, useState, type RefObject } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from 'react-native';

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
  onFocusInput?: (inputRef: RefObject<TextInputType | null>) => void;
};

const GoalRow = ({
  emoji,
  label,
  value,
  unit,
  totalColor,
  step,
  onChangeValue,
  onFocusInput,
}: GoalRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = goalRowStyles[isDark ? 'dark' : 'light'];
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInputType>(null);

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
          style={({ pressed }) => [
            styles.stepperButton,
            pressed && styles.stepperButtonPressed,
          ]}
          onPress={() => onChangeValue(stepGoalValue(value, -step))}
        >
          <Icon name="minus" color={theme.colors.primaryText} size={14} />
        </Pressable>
        <TextInput
          ref={inputRef}
          style={[styles.stepperInput, isFocused && styles.stepperInputFocused]}
          value={value}
          onChangeText={onChangeValue}
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={() => inputRef.current?.blur()}
          accessibilityLabel={label}
          selectionColor={theme.colors.primary}
          cursorColor={theme.colors.primary}
          onFocus={() => {
            setIsFocused(true);
            onFocusInput?.(inputRef);
          }}
          onBlur={() => setIsFocused(false)}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${label}`}
          style={({ pressed }) => [
            styles.stepperButton,
            pressed && styles.stepperButtonPressed,
          ]}
          onPress={() => onChangeValue(stepGoalValue(value, step))}
        >
          <Icon name="plus" color={theme.colors.primaryText} size={14} />
        </Pressable>
      </View>
    </View>
  );
};

export default GoalRow;
