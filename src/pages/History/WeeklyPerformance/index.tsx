import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import MacroProgress from '~/components/shared/MacroProgress';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { weeklyPerformanceStyles } from './styles';

const PEAK_KCAL = 2200;

type ProgressContentProps = {
  children: ReactNode;
};

const ProgressContent = ({ children }: ProgressContentProps) => {
  const { isDark } = useNavigationTheme();
  const styles = weeklyPerformanceStyles[isDark ? 'dark' : 'light'];

  return <View style={styles.list}>{children}</View>;
};

type KcalAccumulatedProps = {
  valueText: string;
  color: string;
};

const KcalAccumulated = ({ valueText, color }: KcalAccumulatedProps) => {
  const { isDark } = useNavigationTheme();
  const styles = weeklyPerformanceStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.kcal}>
      <Text style={[styles.kcalValue, { color }]} numberOfLines={1}>
        {valueText}
      </Text>
      <Text style={styles.kcalUnit} numberOfLines={1}>
        kcal
      </Text>
    </View>
  );
};

type ProgressItemProps = {
  label: string;
  kcal: number;
  valueText: string;
  color: string;
  progress: number;
};

const ProgressItem = ({
  label,
  valueText,
  color,
  progress,
}: ProgressItemProps) => {
  const { isDark } = useNavigationTheme();
  const styles = weeklyPerformanceStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.row}>
      <Text style={styles.day} numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.bar}>
        <MacroProgress progress={progress} color={color} />
      </View>
      <KcalAccumulated valueText={valueText} color={color} />
    </View>
  );
};

const Legend = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = weeklyPerformanceStyles[isDark ? 'dark' : 'light'];
  const items = [
    { label: 'Dentro', color: theme.colors.primary },
    { label: 'Próximo', color: theme.colors.secondary },
    { label: 'Acima', color: theme.colors.error },
  ];

  return (
    <View style={styles.legend}>
      {items.map((item) => (
        <View key={item.label} style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.legendLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const WeeklyPerformance = () => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;
  const days = [
    {
      label: 'Seg',
      kcal: 1820,
      valueText: '1.820',
      color: colors.secondary,
    },
    {
      label: 'Ter',
      kcal: 2100,
      valueText: '2.100',
      color: colors.error,
    },
    {
      label: 'Qua',
      kcal: 1950,
      valueText: '1.950',
      color: colors.secondary,
    },
    {
      label: 'Qui',
      kcal: 1680,
      valueText: '1.680',
      color: colors.primary,
    },
    {
      label: 'Sex',
      kcal: 2200,
      valueText: '2.200',
      color: colors.error,
    },
    {
      label: 'Sáb',
      kcal: 1900,
      valueText: '1.900',
      color: colors.secondary,
    },
    {
      label: 'Dom',
      kcal: 1106,
      valueText: '1.106',
      color: colors.primary,
    },
  ];

  return (
    <Card.Root>
      <Card.SectionTitle title="Desempenho semanal" />
      <ProgressContent>
        {days.map((day) => (
          <ProgressItem
            key={day.label}
            {...day}
            progress={day.kcal / PEAK_KCAL}
          />
        ))}
      </ProgressContent>
      <Legend />
    </Card.Root>
  );
};

export default WeeklyPerformance;
