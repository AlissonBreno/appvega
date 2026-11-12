import type { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { Button } from '~/components/ui/Button';
import Icon from '~/components/ui/Icon';
import { useMeals } from '~/hooks/useMeals';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useToast } from '~/hooks/useToast';
import { useMealBatch } from '~/modules/Meal/contexts/MealBatchContext';
import { addMealFoodEntry } from '~/modules/Meal/services/meal';
import type { MealFood } from '~/modules/Meal/types/MealView';
import {
  batchTotals,
  commitBatch,
  gramsAreValid,
} from '~/modules/Meal/utils/mealBatch';
import { scalePortion } from '~/pages/Home/Meals/portion';
import { catalog } from 'mocks/catalog';
import type { StackParamList } from '~/types/Navigation';

import { mealBatchStyles } from './styles';

const formatOneDecimal = (value: number) => {
  const [whole, fraction] = (Math.round(value * 10) / 10).toFixed(1).split('.');

  return `${whole},${fraction}`;
};

const parseGramsInput = (value: string) => {
  const normalized = value.trim().replace(',', '.');

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  if (!gramsAreValid(parsed)) {
    return null;
  }

  return Math.round(parsed * 10) / 10;
};

type BatchRowProps = {
  mealId: string;
  food: MealFood;
  onRemove: () => void;
};

const BatchRow = ({ mealId, food, onRemove }: BatchRowProps) => {
  const { updateItem } = useMealBatch();
  const { isDark, theme } = useNavigationTheme();
  const styles = mealBatchStyles[isDark ? 'dark' : 'light'];
  const [gramsText, setGramsText] = useState(String(food.grams));

  const applyGrams = (grams: number) => {
    const base = catalog.find(item => item.id === food.catalogFoodId);

    if (!base) {
      return;
    }

    const portion = scalePortion(base, grams);

    updateItem(mealId, {
      ...food,
      grams,
      kcal: portion.kcal,
      carb: portion.carb,
      protein: portion.protein,
      fat: portion.fat,
    });
  };

  return (
    <View style={styles.row}>
      <Text style={styles.rowEmoji}>{food.emoji}</Text>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName} numberOfLines={1}>
          {food.name}
        </Text>
        <Text style={styles.rowKcal}>{`${food.kcal} kcal`}</Text>
      </View>
      <View style={styles.gramsField}>
        <TextInput
          accessibilityLabel={`Quantidade em gramas de ${food.name}`}
          keyboardType="decimal-pad"
          value={gramsText}
          onChangeText={next => {
            setGramsText(next);
            const parsed = parseGramsInput(next);

            if (parsed != null) {
              applyGrams(parsed);
            }
          }}
          onBlur={() => {
            const parsed = parseGramsInput(gramsText);

            setGramsText(parsed == null ? String(food.grams) : String(parsed));
          }}
          style={styles.gramsInput}
        />
        <Text style={styles.gramsUnit}>g</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${food.name}`}
        onPress={onRemove}
        style={styles.removeButton}
      >
        <Icon name="trash" size={14} color={theme.colors.secondaryText} />
      </Pressable>
    </View>
  );
};

type MealBatchProps = StackScreenProps<StackParamList, 'MealBatch'>;

const MealBatch = ({ navigation, route }: MealBatchProps) => {
  const { mealId, subtitle } = route.params;
  const { items, clear, removeItem } = useMealBatch();
  const { selectedDate, refreshMeals } = useMeals();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const styles = mealBatchStyles[isDark ? 'dark' : 'light'];
  const foods = items(mealId);
  const totals = batchTotals(foods);
  const [startedEmpty] = useState(foods.length === 0);
  const [saving, setSaving] = useState(false);

  const goToSearch = () => navigation.navigate('SearchFood', { mealId, subtitle });

  useEffect(() => {
    if (startedEmpty) {
      navigation.navigate('SearchFood', { mealId, subtitle });
    }
  }, [startedEmpty, navigation, mealId, subtitle]);

  const requestLeave = () => {
    Alert.alert('Descartar o lote?', undefined, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Descartar',
        style: 'destructive',
        onPress: () => {
          clear(mealId);
          navigation.navigate('Main');
        },
      },
    ]);
  };

  const removeFood = (foodId: string) => {
    const removedLast = foods.length === 1 && foods[0].id === foodId;

    removeItem(mealId, foodId);

    if (removedLast) {
      goToSearch();
    }
  };

  const confirm = async () => {
    if (saving) {
      return;
    }

    setSaving(true);

    try {
      await commitBatch(foods, food =>
        addMealFoodEntry(mealId, food, selectedDate),
      );
      clear(mealId);
      refreshMeals();
      showToast({
        message: 'Inclusão realizada com sucesso',
        variant: 'success',
      });
      navigation.navigate('Main');
    } catch {
      showToast({
        message: 'Não foi possível salvar o lote',
        variant: 'danger',
      });
      setSaving(false);
    }
  };

  if (foods.length === 0) {
    return null;
  }

  const summary = [
    { label: 'kcal', value: String(totals.kcal), color: theme.colors.primaryText },
    {
      label: 'Carboidratos',
      value: `${formatOneDecimal(totals.carb)}g`,
      color: theme.colors.carb,
    },
    {
      label: 'Proteínas',
      value: `${formatOneDecimal(totals.protein)}g`,
      color: theme.colors.protein,
    },
    {
      label: 'Gorduras',
      value: `${formatOneDecimal(totals.fat)}g`,
      color: theme.colors.fat,
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Back onPress={requestLeave} />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Confirmar lote</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View accessibilityLabel="Totais do lote" style={styles.totals}>
          {summary.map(item => (
            <View key={item.label} style={styles.total}>
              <Text style={[styles.totalValue, { color: item.color }]}>
                {item.value}
              </Text>
              <Text style={styles.totalLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.list}>
          {foods.map(food => (
            <BatchRow
              key={food.id}
              mealId={mealId}
              food={food}
              onRemove={() => removeFood(food.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button.Root
          accessibilityLabel="Confirmar lote"
          onPress={saving ? undefined : confirm}
          style={[styles.confirm, saving && styles.disabled]}
        >
          <Button.Label style={styles.confirmLabel}>Confirmar lote</Button.Label>
        </Button.Root>
        <Button.Root
          accessibilityLabel="Adicionar mais alimentos"
          onPress={saving ? undefined : goToSearch}
          style={[styles.secondary, saving && styles.disabled]}
        >
          <Button.Label style={styles.secondaryLabel}>
            Adicionar mais alimentos
          </Button.Label>
        </Button.Root>
      </View>
    </View>
  );
};

export default MealBatch;
