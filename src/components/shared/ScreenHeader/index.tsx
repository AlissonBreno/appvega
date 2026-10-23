import { Text, View } from 'react-native';

import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { screenHeaderStyles } from './styles';

type ScreenHeaderProps = {
  icon: IconName;
  title: string;
  subtitle: string;
};

function ScreenHeader({ icon, title, subtitle }: ScreenHeaderProps) {
  const { isDark, theme } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Icon name={icon} color={theme.colors.primaryText} size={22} />
      </View>
      <View style={styles.headerCopy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export default ScreenHeader;
