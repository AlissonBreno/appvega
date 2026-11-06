import { useState } from 'react';
import { Text, View } from 'react-native';

import MacroProgress from '~/components/shared/MacroProgress';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { MealMacros } from '~/modules/Meal/types/MealView';

import CircularMacroChart from './CircularMacroChart';
import { dailyProgressStyles } from './styles';

const CHART_MAX_SIZE = 128;
const CHART_MIN_SIZE = 88;
const ROW_GAP = 16;
const GOAL_RESERVE = 112;

const chartSizeForRow = (rowWidth: number) =>
  Math.max(
    CHART_MIN_SIZE,
    Math.min(CHART_MAX_SIZE, rowWidth - ROW_GAP - GOAL_RESERVE),
  );

const formatGrams = (grams: number) => {
  const rounded = Math.round(grams * 10) / 10;
  return `${rounded}g`;
};

const macroFraction = (consumed: number, goal: number) =>
  goal > 0 ? consumed / goal : 0;

type MacroColumnProps = {
  emoji: string;
  grams: string;
  label: string;
  progress: number;
  color: string;
};

const MacroColumn = ({
  emoji,
  grams,
  label,
  progress,
  color,
}: MacroColumnProps) => {
  const { isDark } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.grams}>{grams}</Text>
      </View>
      <MacroProgress progress={progress} color={color} />
      <Text style={styles.caption}>{label}</Text>
    </View>
  );
};

type DailyGoalProps = {
  goalKcal: number;
};

const DailyGoal = ({ goalKcal }: DailyGoalProps) => {
  const { isDark } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.goal}>
      <Text style={styles.goalTitle} numberOfLines={1} adjustsFontSizeToFit>
        Meta diária
      </Text>
      <Text style={styles.goalValue}>{goalKcal} kcal</Text>
    </View>
  );
};

type DailyProgressProps = {
  kcal: number;
  goalKcal: number;
  macros: MealMacros;
  goals: MealMacros;
};

const DailyProgress = ({
  kcal,
  goalKcal,
  macros,
  goals,
}: DailyProgressProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];
  const [rowWidth, setRowWidth] = useState<number>();
  const chartSize =
    rowWidth == null ? CHART_MAX_SIZE : chartSizeForRow(rowWidth);

  const combinedGoal = goals.carb + goals.protein + goals.fat;
  const carbArc = macroFraction(macros.carb, combinedGoal);
  const proteinArc = macroFraction(macros.protein, combinedGoal);
  const fatArc = macroFraction(macros.fat, combinedGoal);

  const carbProgress = macroFraction(macros.carb, goals.carb);
  const proteinProgress = macroFraction(macros.protein, goals.protein);
  const fatProgress = macroFraction(macros.fat, goals.fat);

  return (
    <Card.Root style={styles.card}>
      <View style={styles.viewColumn}>
        <View
          style={styles.view}
          onLayout={({ nativeEvent }) => {
            setRowWidth(nativeEvent.layout.width);
          }}
        >
          <CircularMacroChart
            size={chartSize}
            carb={carbArc}
            protein={proteinArc}
            fat={fatArc}
            carbColor={theme.colors.carb}
            proteinColor={theme.colors.protein}
            fatColor={theme.colors.fat}
            trackColor={theme.colors.border}
            calories={kcal}
          />
          <DailyGoal goalKcal={goalKcal} />
        </View>
        <View style={styles.viewMacroAverage}>
          <MacroColumn
            emoji="🍞"
            grams={formatGrams(macros.carb)}
            label={`Carb / ${formatGrams(goals.carb)}`}
            progress={carbProgress}
            color={theme.colors.carb}
          />
          <MacroColumn
            emoji="🍗"
            grams={formatGrams(macros.protein)}
            label={`Prot / ${formatGrams(goals.protein)}`}
            progress={proteinProgress}
            color={theme.colors.protein}
          />
          <MacroColumn
            emoji="🥑"
            grams={formatGrams(macros.fat)}
            label={`Gord / ${formatGrams(goals.fat)}`}
            progress={fatProgress}
            color={theme.colors.fat}
          />
        </View>
      </View>
    </Card.Root>
  );
};

export default DailyProgress;
