import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { StackParamList, TabParamList } from '~/types/Navigation';

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
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<TabParamList, 'Home'>,
        StackNavigationProp<StackParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = homeStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="heart-rate" />
          <ScreenHeader.Title>VEGA</ScreenHeader.Title>
        </ScreenHeader.Row>
        <ScreenHeader.Subtitle>{formatToday(new Date())}</ScreenHeader.Subtitle>
      </ScreenHeader.Root>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + TAB_CLEARANCE },
        ]}
        directionalLockEnabled
        showsVerticalScrollIndicator={false}
      >
        <WelcomeText />
        <DailyProgress />
        <View style={styles.meals}>
          <Text style={styles.mealsTitle}>Refeições</Text>
          {meals.map(meal => (
            <MealCollapseCard
              key={meal.id}
              meal={meal}
              onAddFood={() =>
                navigation.navigate('SearchFood', {
                  mealId: meal.id,
                  subtitle: `${meal.emoji} ${meal.title}`,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
