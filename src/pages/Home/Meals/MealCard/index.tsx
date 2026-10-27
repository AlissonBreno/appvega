import { Pressable, Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import MacroProgressBar from '../MacroProgressBar';
import { mealTotals } from '../mealTotals';
import type { Meal } from '../types';
import { mealCardStyles } from './styles';

type AddNewFoodProps = {
  onPress?: () => void;
};

const AddNewFood = ({ onPress }: AddNewFoodProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = mealCardStyles[isDark ? 'dark' : 'light'];

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
  const styles = mealCardStyles[isDark ? 'dark' : 'light'];

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

type MealCardProps = {
  meal: Meal;
  onAddFood?: () => void;
  onToggleCollapse?: () => void;
  expanded?: boolean;
};

const MealCard = ({
  meal,
  onAddFood,
  onToggleCollapse,
  expanded = false,
}: MealCardProps) => {
  const { isDark } = useNavigationTheme();
  const styles = mealCardStyles[isDark ? 'dark' : 'light'];
  const totals = mealTotals(meal);

  return (
    <Card.Root>
      <View style={styles.row}>
        <Text style={styles.emoji}>{meal.emoji}</Text>
        <View style={styles.titleColumn}>
          <Text style={styles.title}>{meal.title}</Text>
          <Text style={styles.caption}>{totals.itemCount} itens</Text>
        </View>
        <View style={styles.kcalColumn}>
          <Text style={styles.value}>{totals.kcal}</Text>
          <Text style={styles.caption}>kcal</Text>
        </View>
        <AddNewFood onPress={onAddFood} />
        <CollapseButton expanded={expanded} onPress={onToggleCollapse} />
      </View>
      <MacroProgressBar macros={totals.macros} macroGoal={totals.macroGoal} />
    </Card.Root>
  );
};

export default MealCard;
