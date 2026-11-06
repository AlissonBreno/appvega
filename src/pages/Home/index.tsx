import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useMeals } from '~/hooks/useMeals';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { MealFood } from '~/modules/Meal/types/MealView';
import { getUser } from '~/modules/User/services/user';
import { catalog } from '~/pages/SearchFood/catalog';
import type { StackParamList, TabParamList } from '~/types/Navigation';

import DailyProgress from './DailyProgress';
import MealCollapseCard from './Meals/MealCollapseCard';
import WeekDaySelector from './WeekDaySelector';
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

const resolveCatalogFoodId = (food: MealFood) => {
  if (catalog.some(item => item.id === food.catalogFoodId)) {
    return food.catalogFoodId;
  }

  return (
    catalog.find(item => item.name === food.name)?.id ?? food.catalogFoodId
  );
};

const Home = () => {
  const navigation =
    useNavigation();
  const insets = useSafeAreaInsets();
  const { meals } = useMeals();
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = homeStyles[isDark ? 'dark' : 'light'];
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const user = getUser();
  // Teto de cada refeição é a meta diária inteira; não dividir por meals.length.
  const macroGoals = {
    carb: user.goal_carb,
    protein: user.goal_prot,
    fat: user.goal_fat,
  };

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
        <WeekDaySelector
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <DailyProgress />
        <View style={styles.meals}>
          <Text style={styles.mealsTitle}>Refeições</Text>
          {meals.map(meal => (
            <MealCollapseCard
              key={meal.id}
              meal={meal}
              macroGoals={macroGoals}
              onAddFood={() =>
                navigation.navigate('SearchFood', {
                  mealId: meal.id,
                  subtitle: `${meal.emoji} ${meal.title}`,
                })
              }
              onEditFood={food =>
                navigation.navigate('AddFood', {
                  mealId: meal.id,
                  subtitle: `${meal.emoji} ${meal.title}`,
                  catalogFoodId: resolveCatalogFoodId(food),
                  mealFoodId: food.id,
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
