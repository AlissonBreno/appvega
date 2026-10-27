import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import DailyProgress from './DailyProgress';
import MealCollapseCard from './Meals/MealCollapseCard';
import { meals } from './Meals/meals';
import WelcomeText from './WelcomeText';
import { homeStyles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

const formatToday = (date: Date) => {
  const formatted = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return formatted.charAt(0).toLocaleUpperCase('pt-BR') + formatted.slice(1);
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = homeStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        icon="heartbeat"
        title="VEGA"
        subtitle={formatToday(new Date())}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeText />
        <DailyProgress />
        <View style={styles.meals}>
          <Text style={styles.mealsTitle}>Refeições</Text>
          {meals.map(meal => (
            <MealCollapseCard key={meal.id} meal={meal} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
