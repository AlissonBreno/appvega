import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import { Collapse } from '~/components/ui/Collapse';
import Icon from '~/components/ui/Icon';
import { Pill } from '~/components/ui/Pill';
import { useMeals } from '~/hooks/useMeals';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useToast } from '~/hooks/useToast';
import type { MealFood } from '~/modules/Meal/types/MealView';
import { scalePortion } from '~/pages/Home/Meals/portion';
import { catalog } from 'mocks/catalog';
import type { NutritionFact } from '~/pages/SearchFood/types';
import type { StackParamList } from '~/types/Navigation';

import { addFoodStyles } from './styles';

const GRAM_SHORTCUTS = [50, 100, 150, 200, 250, 300];

const formatAmount = (value: number) => {
  const rounded = Math.round(value * 10) / 10;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  const [whole, fraction] = rounded.toFixed(1).split('.');

  return `${whole},${fraction}`;
};

const formatOneDecimal = (value: number) => {
  const [whole, fraction] = (Math.round(value * 10) / 10).toFixed(1).split('.');

  return `${whole},${fraction}`;
};

const formatGrams = (grams: number) => {
  if (Number.isInteger(grams)) {
    return `${grams}g`;
  }

  return `${formatAmount(grams)}g`;
};

const formatFact = (fact: NutritionFact) => {
  if (fact.amount === null) {
    return `NA ${fact.unit}`;
  }

  return `${formatAmount(fact.amount)} ${fact.unit}`;
};

type FoodIdentityProps = {
  emoji: string;
  name: string;
};

const FoodIdentity = ({ emoji, name }: FoodIdentityProps) => {
  const { isDark } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.identity}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

type KcalBoxProps = {
  kcal: number;
};

const KcalBox = ({ kcal }: KcalBoxProps) => {
  const { isDark } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.kcalBox}>
      <Text style={styles.kcalValue}>{kcal}</Text>
      <Text style={styles.kcalLabel}>kcal</Text>
    </View>
  );
};

type MacroColumnsProps = {
  carb: number;
  protein: number;
  fat: number;
};

const MacroColumns = ({ carb, protein, fat }: MacroColumnsProps) => {
  const { isDark } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];
  const columns = [
    { key: 'carb', emoji: '🍞', label: 'Carboidratos', value: carb },
    { key: 'protein', emoji: '🍗', label: 'Proteínas', value: protein },
    { key: 'fat', emoji: '🥑', label: 'Gorduras', value: fat },
  ];

  return (
    <View style={styles.macros}>
      {columns.map(column => (
        <View key={column.key} style={styles.macro}>
          <Text style={styles.macroEmoji}>{column.emoji}</Text>
          <Text style={styles.macroValue}>
            {formatOneDecimal(column.value)}
          </Text>
          <Text style={styles.macroLabel}>{column.label}</Text>
        </View>
      ))}
    </View>
  );
};

type FactRowProps = {
  fact: NutritionFact;
};

const FactRow = ({ fact }: FactRowProps) => {
  const { isDark } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.factRow}>
      <Text style={styles.factLabel}>{fact.label}</Text>
      <Text style={styles.factValue}>{formatFact(fact)}</Text>
    </View>
  );
};

type NutritionTableProps = {
  facts: NutritionFact[];
};

const NutritionTable = ({ facts }: NutritionTableProps) => {
  const { isDark } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <Collapse.Root>
      <View style={styles.table}>
        <Collapse.Trigger style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Tabela Nutricional</Text>
          <Collapse.Chevron name="tabela nutricional" />
        </Collapse.Trigger>
        <Collapse.Panel>
          {facts.map(fact => (
            <FactRow key={fact.label} fact={fact} />
          ))}
        </Collapse.Panel>
      </View>
    </Collapse.Root>
  );
};

type QuantityControlProps = {
  grams: number;
  onChange: (grams: number) => void;
};

const QuantityControl = ({ grams, onChange }: QuantityControlProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];
  const canDecrease = grams > 10;

  return (
    <View style={styles.quantity}>
      <Text style={styles.quantityTitle}>Quantidade</Text>
      <View style={styles.stepper}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Diminuir 10 gramas"
          accessibilityState={{ disabled: !canDecrease }}
          disabled={!canDecrease}
          onPress={() => {
            if (grams <= 10) {
              return;
            }

            onChange(grams - 10);
          }}
          style={styles.stepperButton}
        >
          <Icon name="minus" size={14} color={theme.colors.secondaryText} />
        </Pressable>
        <Text style={styles.grams}>{formatGrams(grams)}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Aumentar 10 gramas"
          onPress={() => onChange(grams + 10)}
          style={styles.stepperButton}
        >
          <Icon name="plus" size={14} color={theme.colors.secondaryText} />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        directionalLockEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortcuts}
      >
        {GRAM_SHORTCUTS.map(shortcut => (
          <Pill.Root
            key={shortcut}
            accessibilityLabel={`${shortcut} gramas`}
            selected={grams === shortcut}
            onPress={() => onChange(shortcut)}
          >
            <Pill.Label>{`${shortcut}g`}</Pill.Label>
          </Pill.Root>
        ))}
      </ScrollView>
    </View>
  );
};

type AddFoodProps = StackScreenProps<StackParamList, 'AddFood'>;

const AddFood = ({ navigation, route }: AddFoodProps) => {
  const { mealId, subtitle, catalogFoodId, mealFoodId } = route.params;
  const catalogFood = catalog.find(food => food.id === catalogFoodId);
  const { meals, addFood, updateFood } = useMeals();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const styles = addFoodStyles[isDark ? 'dark' : 'light'];
  const existingFood = meals
    .find(meal => meal.id === mealId)
    ?.foods.find(food => food.id === mealFoodId);
  const [grams, setGrams] = useState(() => existingFood?.grams ?? 100);
  const missingCatalog = catalogFood == null;

  useEffect(() => {
    if (missingCatalog) {
      navigation.goBack();
    }
  }, [missingCatalog, navigation]);

  if (!catalogFood) {
    return null;
  }

  const portion = scalePortion(catalogFood, grams);
  const actionLabel = mealFoodId
    ? 'SALVAR NA REFEIÇÃO'
    : 'ADICIONAR À REFEIÇÃO';

  const confirm = () => {
    const food: MealFood = {
      id: mealFoodId ?? `${catalogFoodId}-${Date.now()}`,
      catalogFoodId,
      name: catalogFood.name,
      emoji: catalogFood.emoji,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    };

    if (mealFoodId) {
      updateFood(mealId, mealFoodId, food);
      showToast({
        message: 'Alteração realizada com sucesso',
        variant: 'success',
      });
      navigation.goBack();
      return;
    }

    addFood(mealId, food);
    showToast({
      message: 'Inclusão realizada com sucesso',
      variant: 'success',
    });
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Back onPress={navigation.goBack} />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Adicionando em</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FoodIdentity emoji={catalogFood.emoji} name={catalogFood.name} />
        <KcalBox kcal={portion.kcal} />
        <MacroColumns
          carb={portion.carb}
          protein={portion.protein}
          fat={portion.fat}
        />
        <NutritionTable facts={portion.facts} />
        <QuantityControl grams={grams} onChange={setGrams} />
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button.Root
          accessibilityLabel={actionLabel}
          onPress={confirm}
          style={styles.confirm}
        >
          <Button.Icon name="plus" color={theme.colors.background} />
          <Button.Label style={styles.confirmLabel}>{actionLabel}</Button.Label>
        </Button.Root>
      </View>
    </View>
  );
};

export default AddFood;
