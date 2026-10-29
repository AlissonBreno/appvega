import { Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { Colors } from '~/types/Theme';

import { dailyCaloriesLayout, dailyCaloriesStyles } from './styles';

const GOAL_KCAL = 2000;
const Y_MAX_KCAL = GOAL_KCAL + 500;
const NEAR_MIN_KCAL = GOAL_KCAL * 0.9;
const Y_TICKS = [0, 650, 1000, GOAL_KCAL, Y_MAX_KCAL] as const;
const DASH_COUNT = 24;

const DAYS = [
  { label: 'Seg', kcal: 1050 },
  { label: 'Ter', kcal: 2320 },
  { label: 'Qua', kcal: 1400 },
  { label: 'Qui', kcal: 1700 },
  { label: 'Sex', kcal: 2150 },
  { label: 'Sáb', kcal: 1650 },
  { label: 'Dom', kcal: 850 },
] as const;

const formatThousands = (value: number) =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const barColorForKcal = (kcal: number, colors: Colors) => {
  if (kcal > GOAL_KCAL) {
    return colors.error;
  }

  if (kcal >= NEAR_MIN_KCAL) {
    return colors.secondary;
  }

  return colors.primary;
};

const scaleOffset = (kcal: number) =>
  (kcal / Y_MAX_KCAL) * dailyCaloriesLayout.chartHeight;

const YAxis = () => {
  const { isDark } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];
  const { yLabelLineHeight } = dailyCaloriesLayout;

  return (
    <View style={styles.yAxis}>
      {Y_TICKS.map((tick) => (
        <Text
          key={tick}
          style={[
            styles.yLabel,
            {
              bottom: scaleOffset(tick),
              transform: [{ translateY: yLabelLineHeight / 2 }],
            },
          ]}
          numberOfLines={1}
        >
          {formatThousands(tick)}
        </Text>
      ))}
    </View>
  );
};

const GoalLine = () => {
  const { isDark } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];
  const { dashHeight } = dailyCaloriesLayout;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.goalLine,
        {
          bottom: scaleOffset(GOAL_KCAL),
          transform: [{ translateY: dashHeight / 2 }],
        },
      ]}
    >
      {Array.from({ length: DASH_COUNT }, (_, index) => (
        <View key={index} style={styles.dash} />
      ))}
    </View>
  );
};

type BarColumnProps = {
  kcal: number;
  color: string;
};

const BarColumn = ({ kcal, color }: BarColumnProps) => {
  const { isDark } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];
  const barHeight = Math.min(scaleOffset(kcal), dailyCaloriesLayout.chartHeight);

  return (
    <View style={styles.barSlot}>
      <View
        style={[
          styles.bar,
          {
            height: barHeight,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const Plot = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.plot}>
      <GoalLine />
      <View style={styles.bars}>
        {DAYS.map((day) => (
          <BarColumn
            key={day.label}
            kcal={day.kcal}
            color={barColorForKcal(day.kcal, theme.colors)}
          />
        ))}
      </View>
    </View>
  );
};

const DayAxis = () => {
  const { isDark } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.dayRow}>
      <View style={styles.yAxisSpacer} />
      <View style={styles.dayLabels}>
        {DAYS.map((day) => (
          <Text key={day.label} style={styles.dayLabel} numberOfLines={1}>
            {day.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const DailyCalories = () => {
  const { isDark } = useNavigationTheme();
  const styles = dailyCaloriesStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root>
      <View style={styles.header}>
        <Card.SectionTitle title="Calorias por dia" />
        <View style={styles.goal}>
          <Text style={styles.goalValue}>{formatThousands(GOAL_KCAL)}</Text>
          <Text style={styles.goalUnit}>kcal</Text>
        </View>
      </View>
      <View>
        <View style={styles.chartRow}>
          <YAxis />
          <Plot />
        </View>
        <DayAxis />
      </View>
    </Card.Root>
  );
};

export default DailyCalories;
