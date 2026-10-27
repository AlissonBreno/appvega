import { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import MacroProgressBar from '../MacroProgressBar';
import { mealTotals } from '../mealTotals';
import type { Meal, MealFood, MealMacros } from '../types';
import { mealCollapseCardStyles } from './styles';

const formatGrams = (grams: number) => {
  const rounded = Math.round(grams * 10) / 10;

  if (Number.isInteger(rounded)) {
    return `${rounded}g`;
  }

  return `${rounded.toFixed(1)}g`;
};

type AddNewFoodProps = {
  onPress?: () => void;
};

const AddNewFood = ({ onPress }: AddNewFoodProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Adicionar alimento"
      onPress={onPress}
      style={styles.addButton}
    >
      <Icon name="plus" size={16} color={theme.colors.foreground} />
    </Pressable>
  );
};

type CollapseButtonProps = {
  expanded: boolean;
  onPress?: () => void;
};

const CollapseButton = ({ expanded, onPress }: CollapseButtonProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={expanded ? 'Recolher refeição' : 'Expandir refeição'}
      accessibilityState={{ expanded }}
      onPress={onPress}
      style={[
        styles.collapseButton,
        expanded ? styles.collapseButtonExpanded : null,
      ]}
    >
      <Icon name="chevron-down" size={16} color={theme.colors.secondaryText} />
    </Pressable>
  );
};

type MacroGramsProps = {
  macros: MealMacros;
};

const MacroGrams = ({ macros }: MacroGramsProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];
  const items = [
    { key: 'carb', letter: 'C', grams: macros.carb, color: theme.colors.carb },
    {
      key: 'protein',
      letter: 'P',
      grams: macros.protein,
      color: theme.colors.protein,
    },
    { key: 'fat', letter: 'G', grams: macros.fat, color: theme.colors.fat },
  ];

  return (
    <View style={styles.macros}>
      {items.map(item => (
        <View key={item.key} style={styles.macro}>
          <Text style={[styles.macroLetter, { color: item.color }]}>
            {item.letter}
          </Text>
          <Text style={styles.macroValue}>{formatGrams(item.grams)}</Text>
        </View>
      ))}
    </View>
  );
};

type FoodRowProps = {
  food: MealFood;
};

const FoodRow = ({ food }: FoodRowProps) => {
  const { isDark } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.foodRow}>
      <View style={styles.foodBody}>
        <View style={styles.foodTitleRow}>
          <Text style={styles.title}>{food.name}</Text>
          <Text style={styles.quantity}>{formatGrams(food.grams)}</Text>
        </View>
        <MacroGrams macros={food} />
      </View>
      <View style={styles.kcalColumn}>
        <Text style={styles.value}>{food.kcal}</Text>
        <Text style={styles.caption}>kcal</Text>
      </View>
    </View>
  );
};

type SubtotalProps = {
  macros: MealMacros;
};

const Subtotal = ({ macros }: SubtotalProps) => {
  const { isDark } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.subtotal}>
      <Text style={styles.title}>Subtotal</Text>
      <MacroGrams macros={macros} />
    </View>
  );
};

type MealCollapseCardProps = {
  meal: Meal;
  onAddFood?: () => void;
};

const MealCollapseCard = ({ meal, onAddFood }: MealCollapseCardProps) => {
  const { isDark } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];
  const totals = mealTotals(meal);
  const [expanded, setExpanded] = useState(false);
  const showFoods = expanded && meal.foods.length > 0;
  const toggleExpanded = () => setExpanded(current => !current);

  return (
    <Card.Root style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={
            expanded ? 'Recolher refeição' : 'Expandir refeição'
          }
          accessibilityState={{ expanded }}
          onPress={toggleExpanded}
          style={styles.summary}
        >
          <Text style={styles.emoji}>{meal.emoji}</Text>
          <View style={styles.titleColumn}>
            <Text style={styles.title}>{meal.title}</Text>
            <Text style={styles.caption}>{totals.itemCount} itens</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.kcalColumn}>
          <Text style={styles.value}>{totals.kcal}</Text>
          <Text style={styles.caption}>kcal</Text>
        </View>
        <AddNewFood onPress={onAddFood} />
        <CollapseButton expanded={expanded} onPress={toggleExpanded} />
      </View>
      <MacroProgressBar macros={totals.macros} macroGoal={totals.macroGoal} />
      {showFoods ? (
        <View>
          {meal.foods.map((food, index) => (
            <View key={food.id}>
              {index > 0 ? <View style={styles.separator} /> : null}
              <FoodRow food={food} />
            </View>
          ))}
          <Subtotal macros={totals.macros} />
        </View>
      ) : null}
    </Card.Root>
  );
};

export default MealCollapseCard;
