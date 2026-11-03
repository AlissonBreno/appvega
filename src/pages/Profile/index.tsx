import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { getUser } from '~/services/users';

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
  const user = getUser();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="user-cog" />
          <ScreenHeader.Title>Perfil & metas</ScreenHeader.Title>
        </ScreenHeader.Row>
        <ScreenHeader.Subtitle>
          Configure suas metas nutricionais
        </ScreenHeader.Subtitle>
      </ScreenHeader.Root>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ProfileSummary user={user} />
        <DailyGoals user={user} />
        <Tools />
        <AppAbout />
      </ScrollView>
    </View>
  );
};

export default Profile;
