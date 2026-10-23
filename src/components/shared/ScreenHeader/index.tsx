import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { screenHeaderStyles } from './styles';

type ScreenHeaderProps = {
  icon: IconName;
  title: string;
  subtitle: string;
};

function ScreenHeader({ icon, title, subtitle }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
      <View style={styles.titleRow}>
        <Icon name={icon} color={theme.colors.primary} size={24} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export default ScreenHeader;
