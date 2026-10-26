import { useState } from 'react';
import { Text, View } from 'react-native';

import MacroProgress from '~/components/shared/MacroProgress';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import CircularMacroChart from './CircularMacroChart';
import { dailyProgressStyles } from './styles';

const CARB_PROGRESS = 125.3 / 250;
const PROTEIN_PROGRESS = 75.3 / 250;
const FAT_PROGRESS = 25.1 / 250;
const CALORIES_EATEN = 1108;
const CHART_MAX_SIZE = 128;
const CHART_MIN_SIZE = 88;
const ROW_GAP = 16;
const GOAL_RESERVE = 112;

const chartSizeForRow = (rowWidth: number) =>
  Math.max(
    CHART_MIN_SIZE,
    Math.min(CHART_MAX_SIZE, rowWidth - ROW_GAP - GOAL_RESERVE),
  );

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

const DailyGoal = () => {
  const { isDark } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.goal}>
      <Text style={styles.goalTitle} numberOfLines={1} adjustsFontSizeToFit>
        Meta diária
      </Text>
      <Text style={styles.goalValue}>2600 kcal</Text>
    </View>
  );
};

const DailyProgress = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];
  const [rowWidth, setRowWidth] = useState<number>();
  const chartSize =
    rowWidth == null ? CHART_MAX_SIZE : chartSizeForRow(rowWidth);

  return (
    <Card.Root>
      <View style={styles.viewColumn}>
        <View
          style={styles.view}
          onLayout={({ nativeEvent }) => {
            setRowWidth(nativeEvent.layout.width);
          }}
        >
          <CircularMacroChart
            size={chartSize}
            carb={CARB_PROGRESS}
            protein={PROTEIN_PROGRESS}
            fat={FAT_PROGRESS}
            carbColor={theme.colors.carb}
            proteinColor={theme.colors.protein}
            fatColor={theme.colors.fat}
            trackColor={theme.colors.border}
            calories={CALORIES_EATEN}
          />
          <DailyGoal />
        </View>
        <View style={styles.viewMacroAverage}>
          <MacroColumn
            emoji="🍞"
            grams="125.3g"
            label="Carb / 250g"
            progress={CARB_PROGRESS}
            color={theme.colors.carb}
          />
          <MacroColumn
            emoji="🍗"
            grams="75.3g"
            label="Prot / 250g"
            progress={PROTEIN_PROGRESS}
            color={theme.colors.protein}
          />
          <MacroColumn
            emoji="🥑"
            grams="25.1g"
            label="Gord / 250g"
            progress={FAT_PROGRESS}
            color={theme.colors.fat}
          />
        </View>
      </View>
    </Card.Root>
  );
};

export default DailyProgress;
