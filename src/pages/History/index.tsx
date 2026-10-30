import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import DailyCalories from './DailyCalories';
import GamifiedGoals from './GamifiedGoals';
import MacroAverage from './MacroAverage';
import WeeklyPerformance from './WeeklyPerformance';
import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

const History = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="chart-bar" />
          <ScreenHeader.Title>Histórico</ScreenHeader.Title>
        </ScreenHeader.Row>
        <ScreenHeader.Subtitle>Últimos 7 dias</ScreenHeader.Subtitle>
      </ScreenHeader.Root>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <GamifiedGoals />
        <DailyCalories />
        <WeeklyPerformance />
        <MacroAverage />
      </ScrollView>
    </View>
  );
};

export default History;
