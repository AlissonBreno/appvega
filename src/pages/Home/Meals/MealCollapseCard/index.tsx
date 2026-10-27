import { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import MacroProgressBar from '../MacroProgressBar';
import { mealTotals } from '../mealTotals';
import type { Meal, MealFood, MealMacros } from '../types';
import { mealCollapseCardStyles } from './styles';

const FOOD_ACTION_SIZE = 44;
const FOOD_ACTION_GAP = 8;
const FOOD_ACTIONS_WIDTH = FOOD_ACTION_GAP + FOOD_ACTION_SIZE * 2 + FOOD_ACTION_GAP;

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
  onEdit?: () => void;
  onDelete: () => void;
};

const FoodRow = ({ food, onEdit, onDelete }: FoodRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];
  const translateX = useRef(new Animated.Value(0)).current;
  const opened = useRef(false);
  const [rowWidth, setRowWidth] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 12 &&
        Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_, gesture) => {
        const base = opened.current ? -FOOD_ACTIONS_WIDTH : 0;
        const next = Math.min(
          0,
          Math.max(-FOOD_ACTIONS_WIDTH, base + gesture.dx),
        );
        translateX.setValue(next);
      },
      onPanResponderRelease: (_, gesture) => {
        const base = opened.current ? -FOOD_ACTIONS_WIDTH : 0;
        const projected = base + gesture.dx + gesture.vx * 40;
        opened.current = projected < -FOOD_ACTIONS_WIDTH / 2;
        Animated.spring(translateX, {
          toValue: opened.current ? -FOOD_ACTIONS_WIDTH : 0,
          useNativeDriver: true,
          speed: 20,
          bounciness: 0,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: opened.current ? -FOOD_ACTIONS_WIDTH : 0,
          useNativeDriver: true,
          speed: 20,
          bounciness: 0,
        }).start();
      },
    }),
  ).current;

  const closeActions = () => {
    opened.current = false;
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  return (
    <View
      style={styles.foodSwipe}
      onLayout={({ nativeEvent }) => setRowWidth(nativeEvent.layout.width)}
    >
      <Animated.View
        style={[styles.foodTrack, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.foodRow, rowWidth > 0 ? { width: rowWidth } : null]}>
          <View style={styles.foodEmoji}>
            <Text style={styles.foodEmojiGlyph}>{food.emoji}</Text>
          </View>
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
          <Icon
            name="grip-lines-vertical"
            size={16}
            color={theme.colors.secondaryText}
          />
        </View>
        <View style={styles.foodActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Editar ${food.name}`}
            onPress={() => {
              closeActions();
              onEdit?.();
            }}
            style={[styles.foodAction, styles.foodActionEdit]}
          >
            <Icon name="pencil" size={16} color={theme.colors.foreground} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Excluir ${food.name}`}
            onPress={onDelete}
            style={[styles.foodAction, styles.foodActionDelete]}
          >
            <Icon
              name="trash"
              size={16}
              color={isDark ? theme.colors.primaryText : theme.colors.foreground}
            />
          </Pressable>
        </View>
      </Animated.View>
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
  const [foods, setFoods] = useState(meal.foods);
  const totals =
    foods.length === 0 && meal.foods.length > 0
      ? {
          itemCount: 0,
          kcal: 0,
          macros: { carb: 0, protein: 0, fat: 0 },
          macroGoal: meal.macroGoal,
        }
      : mealTotals({ ...meal, foods });
  const [expanded, setExpanded] = useState(false);
  const showFoods = expanded && foods.length > 0;
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
          {foods.map((food, index) => (
            <View key={food.id}>
              {index >= 0 ? <View style={styles.separator} /> : null}
              <FoodRow
                food={food}
                onDelete={() =>
                  setFoods(current =>
                    current.filter(item => item.id !== food.id),
                  )
                }
              />
            </View>
          ))}
          <Subtotal macros={totals.macros} />
        </View>
      ) : null}
    </Card.Root>
  );
};

export default MealCollapseCard;
