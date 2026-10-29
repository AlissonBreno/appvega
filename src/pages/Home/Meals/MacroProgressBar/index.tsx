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
  ].filter(segment => segment.fraction > 0);
  const remainder = Math.max(0, 1 - (carb + protein + fat));

  return (
    <View style={styles.track}>
      {segments.map(segment => (
        <View
          key={segment.key}
          style={[
            styles.segment,
            { flex: segment.fraction, backgroundColor: segment.color },
          ]}
        />
      ))}
      {remainder > 0 ? <View style={{ flex: remainder }} /> : null}
    </View>
  );
};

export default MacroProgressBar;
