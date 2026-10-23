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
      <View style={styles.headerIcon}>
        <Icon name={icon} color={theme.colors.primary} size={22} />
      </View>
      <View style={styles.headerCopy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export default ScreenHeader;
