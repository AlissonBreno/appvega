import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInput as TextInputType,
} from 'react-native';

import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import {
  formatGramsPerKg,
  formatMacroKcal,
  stepGoalValue,
  type GoalKey,
} from '../goalDraft';
import { goalRowStyles } from './styles';

type CaretSelection = {
  start: number;
  end: number;
};

const caretAtEnd = (text: string): CaretSelection => ({
  start: text.length,
  end: text.length,
});

export type GoalRowProps = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  goalKey: GoalKey;
  weightKg: number;
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
  goalKey,
  weightKg,
  totalColor,
  step,
  onChangeValue,
  onFocusInput,
}: GoalRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = goalRowStyles[isDark ? 'dark' : 'light'];
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState<CaretSelection>(() =>
    caretAtEnd(value),
  );
  const inputRef = useRef<TextInputType>(null);

  const gramsPerKg =
    unit === 'g' ? formatGramsPerKg(value, weightKg) : null;
  const totalLabel =
    gramsPerKg !== null ? `${gramsPerKg} g/kg` : `${value} ${unit}`;
  const macroKcal = formatMacroKcal(value, goalKey);

  useEffect(() => {
    if (isFocused) {
      setSelection(caretAtEnd(value));
    }
  }, [value, isFocused]);

  return (
    <View style={styles.goalRow}>
      <View style={styles.goalRowLabel}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.goalLabel}>{label}</Text>
        <View style={styles.goalTotals}>
          <Text style={[styles.goalTotal, { color: totalColor }]}>
            {totalLabel}
          </Text>
          {macroKcal !== null ? (
            <Text style={styles.goalKcal}>({macroKcal}kcal)</Text>
          ) : null}
        </View>
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
          selection={selection}
          contextMenuHidden
          selectionColor={theme.colors.primary}
          cursorColor={theme.colors.primary}
          onSelectionChange={event => {
            const { start, end } = event.nativeEvent.selection;
            const length = value.length;

            if (start !== length || end !== length) {
              setSelection(caretAtEnd(value));
            }
          }}
          onFocus={() => {
            setIsFocused(true);
            setSelection(caretAtEnd(value));
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
