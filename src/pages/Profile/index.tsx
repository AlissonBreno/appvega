import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { Theme } from '~/types/Theme';

import DailyGoals from './DailyGoals';
import ProfileSummary from './ProfileSummary';
import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

const AppAbout = ({ theme }: { theme: Theme }) => {
  const { colors, fonts } = theme;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.foreground, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.aboutTitle, fonts.medium, { color: colors.primaryText }]}>
        VEGA · Nutrição fácil
      </Text>
      <Text style={[styles.version, fonts.light, { color: colors.secondaryText }]}>
        v1.0.0 · by Alisson Goulart
      </Text>
      <Text style={[styles.aboutBody, fonts.light, { color: colors.secondaryText }]}>
        Auxilia o monitoramento nutricional e não substitui acompanhamento clínico.
      </Text>
    </View>
  );
};

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
        <AppAbout theme={theme} />
      </ScrollView>
    </View>
  );
};

export default Profile;
