import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import AppAbout from './AppAbout';
import DailyGoals from './DailyGoals';
import ProfileSummary from './ProfileSummary';
import Tools from './Tools';
import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        icon="user-cog"
        title="Perfil & metas"
        subtitle="Configure suas metas nutricionais"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileSummary />
        <DailyGoals />
        <Tools />
        <AppAbout />
      </ScrollView>
    </View>
  );
};

export default Profile;
