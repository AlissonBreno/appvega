import { Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { macroAverageStyles } from './styles';

type MacroProgressProps = {
  progress: number;
  color: string;
};

const MacroProgress = ({ progress, color }: MacroProgressProps) => {
  const { isDark } = useNavigationTheme();
  const styles = macroAverageStyles[isDark ? 'dark' : 'light'];
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
};

type MacroColumnProps = {
  emoji: string;
  valueText: string;
  labelText: string;
  progress: number;
  color: string;
};

const MacroColumn = ({
  emoji,
  valueText,
  labelText,
  progress,
  color,
}: MacroColumnProps) => {
  const { isDark } = useNavigationTheme();
  const styles = macroAverageStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.column}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.valueGroup}>
        <Text style={styles.value}>{valueText}</Text>
        <Text style={styles.label}>{labelText}</Text>
      </View>
      <MacroProgress progress={progress} color={color} />
    </View>
  );
};

const MacroAverage = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = macroAverageStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root>
      <Card.SectionTitle title="Média de macros (7 dias)" />
      <View style={styles.row}>
        <MacroColumn
          emoji="🍞"
          valueText="222g"
          labelText="/ 250g"
          progress={222 / 250}
          color={theme.colors.carb}
        />
        <MacroColumn
          emoji="🥚"
          valueText="131g"
          labelText="/ 150g"
          progress={131 / 150}
          color={theme.colors.protein}
        />
        <MacroColumn
          emoji="🥑"
          valueText="58g"
          labelText="/ 65g"
          progress={58 / 65}
          color={theme.colors.fat}
        />
      </View>
    </Card.Root>
  );
};

export default MacroAverage;
