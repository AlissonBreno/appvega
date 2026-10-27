import { View } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { macroArcFractions } from '~/pages/Home/DailyProgress/macroArcFractions';

import type { MealMacros } from '../types';
import { macroProgressBarStyles } from './styles';

type MacroProgressBarProps = {
  macros: MealMacros;
  macroGoal: number;
};

const MacroProgressBar = ({ macros, macroGoal }: MacroProgressBarProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = macroProgressBarStyles[isDark ? 'dark' : 'light'];
  const share = (grams: number) => (macroGoal > 0 ? grams / macroGoal : 0);
  const [carb, protein, fat] = macroArcFractions(
    share(macros.carb),
    share(macros.protein),
    share(macros.fat),
  );
  const segments = [
    { key: 'carb', fraction: carb, color: theme.colors.carb },
    { key: 'protein', fraction: protein, color: theme.colors.protein },
    { key: 'fat', fraction: fat, color: theme.colors.fat },
  ];

  return (
    <View style={styles.track}>
      {segments
        .filter(segment => segment.fraction > 0)
        .map(segment => (
          <View
            key={segment.key}
            style={[
              styles.segment,
              {
                width: `${segment.fraction * 100}%`,
                backgroundColor: segment.color,
              },
            ]}
          />
        ))}
    </View>
  );
};

export default MacroProgressBar;
