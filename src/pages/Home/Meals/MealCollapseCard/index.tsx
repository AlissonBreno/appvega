import { useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { useMeals } from '~/hooks/useMeals';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useToast } from '~/hooks/useToast';

import MacroProgressBar from '../MacroProgressBar';
import { mealTotals } from '../mealTotals';
import type { Meal, MealFood, MealMacros } from '../types';
import { mealCollapseCardStyles } from './styles';

const FOOD_ACTION_SIZE = 44;
const FOOD_ACTION_GAP = 8;
const FOOD_ACTIONS_WIDTH =
  FOOD_ACTION_GAP + FOOD_ACTION_SIZE * 2 + FOOD_ACTION_GAP;

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
    scrollRef.current?.scrollTo({ x: 0, animated: true });
    onEdit?.();
  };

  const handleOnExclude = () => {
    Alert.alert('Excluir alimento', `Confirma a exclusão de ${food.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: onDelete },
    ]);
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
  onEditFood?: (food: MealFood) => void;
};

const MealCollapseCard = ({
  meal,
  onAddFood,
  onEditFood,
}: MealCollapseCardProps) => {
  const { isDark } = useNavigationTheme();
  const { showToast } = useToast();
  const { removeFood } = useMeals();
  const styles = mealCollapseCardStyles[isDark ? 'dark' : 'light'];
  const totals = mealTotals(meal);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(current => !current);
  const resumo = `${meal.title}, ${totals.itemCount} itens`;

  return (
    <Card.Root style={styles.card}>
      <Collapse.Root expanded={expanded} onToggle={toggleExpanded}>
        <View style={styles.row}>
          <Collapse.Trigger accessibilityLabel={resumo} style={styles.summary}>
            <Text style={styles.emoji}>{meal.emoji}</Text>
            <View style={styles.titleColumn}>
              <Text style={styles.title}>{meal.title}</Text>
              <Text style={styles.caption}>{totals.itemCount} itens</Text>
            </View>
          </Collapse.Trigger>
          <View style={styles.kcalColumn}>
            <Text style={styles.value}>{totals.kcal}</Text>
            <Text style={styles.caption}>kcal</Text>
          </View>
          <AddNewFood onPress={onAddFood} />
          <Collapse.Trigger style={styles.collapseButton}>
            <Collapse.Chevron name="refeição" />
          </Collapse.Trigger>
        </View>
        <MacroProgressBar macros={totals.macros} macroGoal={totals.macroGoal} />
        {meal.foods.length > 0 ? (
          <Collapse.Panel>
            <View>
              {meal.foods.map((food, index) => (
                <View key={food.id}>
                  {index >= 0 ? <View style={styles.separator} /> : null}
                  <FoodRow
                    food={food}
                    onEdit={() => onEditFood?.(food)}
                    onDelete={() => {
                      removeFood(meal.id, food.id);
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
          </Collapse.Panel>
        ) : null}
      </Collapse.Root>
    </Card.Root>
  );
};

export default MealCollapseCard;
