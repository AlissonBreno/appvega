import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/shared/ScreenHeader';
import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import GamifiedGoals from './GamifiedGoals';
import MacroAverage from './MacroAverage';
import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

const History = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        icon="chart-bar"
        title="Histórico"
        subtitle="Últimos 7 dias"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <GamifiedGoals />
        <Card.Root>
          <Card.SectionTitle title="Calorias por dia" />
        </Card.Root>
        <Card.Root>
          <Card.SectionTitle title="Desempenho semanal" />
        </Card.Root>
        <MacroAverage />
      </ScrollView>
    </View>
  );
};

export default History;
