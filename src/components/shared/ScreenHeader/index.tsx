import { Text, View } from 'react-native';

import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { styles } from './styles';

type ScreenHeaderProps = {
  icon: IconName;
  title: string;
  subtitle: string;
};

function ScreenHeader({ icon, title, subtitle }: ScreenHeaderProps) {
  const { theme } = useNavigationTheme();
  const { colors, fonts } = theme;

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.headerIcon,
          { backgroundColor: colors.foreground, borderColor: colors.border },
        ]}
      >
        <Icon name={icon} color={colors.primaryText} size={22} />
      </View>
      <View style={styles.headerCopy}>
        <Text style={[styles.title, fonts.bold, { color: colors.primaryText }]}>
          {title}
        </Text>
        <Text
          style={[styles.subtitle, fonts.light, { color: colors.secondaryText }]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

export default ScreenHeader;
