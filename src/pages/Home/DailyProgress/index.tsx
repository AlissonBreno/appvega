import { Text, View } from 'react-native';

import MacroProgress from '~/components/shared/MacroProgress';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { dailyProgressStyles } from './styles';

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
    <View>
      <Text style={styles.goalTitle}>Meta diária</Text>
      <Text style={styles.goalValue}>2600 kcal</Text>
    </View>
  );
};

const DailyProgress = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = dailyProgressStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root>
      <View style={styles.viewColumn}>
        <View style={styles.view}>
          <View style={styles.circularProgressChart} />
          <DailyGoal />
        </View>
        <View style={styles.viewMacroAverage}>
          <MacroColumn
            emoji="🍞"
            grams="125.3g"
            label="Carb / 250g"
            progress={125.3 / 250}
            color={theme.colors.carb}
          />
          <MacroColumn
            emoji="🍗"
            grams="75.3g"
            label="Prot / 250g"
            progress={75.3 / 250}
            color={theme.colors.protein}
          />
          <MacroColumn
            emoji="🥑"
            grams="25.1g"
            label="Gord / 250g"
            progress={25.1 / 250}
            color={theme.colors.fat}
          />
        </View>
      </View>
    </Card.Root>
  );
};

export default DailyProgress;
