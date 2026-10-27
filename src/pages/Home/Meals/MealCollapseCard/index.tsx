import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useToast } from '~/hooks/useToast';

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
  const scrollRef = useRef<ScrollView>(null);
  const [rowWidth, setRowWidth] = useState(0);

  const handleOnEdit = () => {
    console.log(`Editar ${food.name}`);
    scrollRef.current?.scrollTo({ x: 0, animated: true });
    onEdit?.();
  };

  const handleOnExclude = () => {
    console.log(`Excluir ${food.name}`);
    onDelete();
  };

  return (
    <View
      style={styles.foodSwipe}
      onLayout={({ nativeEvent }) => setRowWidth(nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces
        alwaysBounceHorizontal
        overScrollMode="always"
        directionalLockEnabled
        nestedScrollEnabled
        snapToOffsets={[0, FOOD_ACTIONS_WIDTH]}
        snapToEnd
        disableIntervalMomentum
        decelerationRate="fast"
        contentContainerStyle={styles.foodTrack}
      >
        <View
          style={[styles.foodRow, rowWidth > 0 ? { width: rowWidth } : null]}
        >
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
        <View style={[styles.foodActions, { width: FOOD_ACTIONS_WIDTH }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Editar ${food.name}`}
            onPress={handleOnEdit}
            style={[styles.foodAction, styles.foodActionEdit]}
          >
            <Icon name="pencil" size={16} color={theme.colors.foreground} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Excluir ${food.name}`}
            onPress={handleOnExclude}
            style={[styles.foodAction, styles.foodActionDelete]}
          >
            <Icon
              name="trash"
              size={16}
              color={
                isDark ? theme.colors.primaryText : theme.colors.foreground
              }
            />
          </Pressable>
        </View>
      </ScrollView>
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
  const { showToast } = useToast();
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
                onDelete={() => {
                  setFoods(current =>
                    current.filter(item => item.id !== food.id),
                  );
                  showToast({
                    message: 'Exclusão realizada com sucesso',
                    variant: 'success',
                  });
                }}
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
