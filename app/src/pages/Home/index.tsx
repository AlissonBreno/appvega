import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  useFocusEffect,
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useMeals } from '~/hooks/useMeals';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useUser } from '~/hooks/useUser';
import type { Meal, MealFood } from '~/modules/Meal/types/MealView';
import { dailyMealTotals } from '~/modules/Meal/utils/dailyMealTotals';
import { catalog } from 'mocks/catalog';
import type { StackParamList, TabParamList } from '~/types/Navigation';

import DailyProgress from './DailyProgress';
import HomeSkeleton from './HomeSkeleton';
import MealCollapseCard from './Meals/MealCollapseCard';
import WeekDaySelector from './WeekDaySelector';
import { homeStyles } from './styles';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<StackParamList>
>;

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
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets();
  const { meals, selectedDate, isLoading, selectDate, refreshMeals } =
    useMeals();
  const { user, refreshUser } = useUser();
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = homeStyles[isDark ? 'dark' : 'light'];

  useFocusEffect(
    useCallback(() => {
      refreshMeals();
      refreshUser();
    }, [refreshMeals, refreshUser]),
  );

  const macroGoals = {
    carb: user.goal_carb,
    protein: user.goal_prot,
    fat: user.goal_fat,
  };

  const totals = useMemo(() => dailyMealTotals(meals), [meals]);

  const handleOnAddFood = (meal: Meal) => {
    navigation.navigate('SearchFood', {
      mealId: meal.id,
      subtitle: `${meal.emoji} ${meal.title}`,
    });
  };

  const handleOnEditFood = (meal: Meal, food: MealFood) => {
    navigation.navigate('AddFood', {
      mealId: meal.id,
      subtitle: `${meal.emoji} ${meal.title}`,
      catalogFoodId: resolveCatalogFoodId(food),
      mealFoodId: food.id,
    });
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
          onSelectDate={selectDate}
        />
        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <View>
            <DailyProgress
              kcal={totals.kcal}
              goalKcal={user.goal_kcal}
              macros={totals.macros}
              goals={macroGoals}
            />
            <View style={styles.meals}>
              <Text style={styles.mealsTitle}>Refeições</Text>
              {meals.map(meal => (
                <MealCollapseCard
                  key={meal.id}
                  meal={meal}
                  macroGoals={macroGoals}
                  onAddFood={() => handleOnAddFood(meal)}
                  onEditFood={food => handleOnEditFood(meal, food)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
