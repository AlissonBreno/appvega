import { View } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { macroProgressStyles } from './styles';

type MacroProgressProps = {
  progress: number;
  color: string;
};

const MacroProgress = ({ progress, color }: MacroProgressProps) => {
  const { isDark } = useNavigationTheme();
  const styles = macroProgressStyles[isDark ? 'dark' : 'light'];
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

export default MacroProgress;
