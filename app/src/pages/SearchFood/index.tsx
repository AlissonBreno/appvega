import type { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import Icon from '~/components/ui/Icon';
import { Input } from '~/components/ui/Input';
import { Pill } from '~/components/ui/Pill';
import { useBatchDiscardGuard } from '~/hooks/useBatchDiscardGuard';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { StackParamList } from '~/types/Navigation';

import { catalog } from 'mocks/catalog';
import { filterCatalogFoods, formatFoodCount } from './filterCatalogFoods';
import { searchFoodStyles } from './styles';
import type { CatalogFood, FoodFilter } from './types';

const formatAmount = (value: number) => {
  const rounded = Math.round(value * 10) / 10;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  return rounded.toFixed(1);
};

type FoodMetaProps = {
  food: CatalogFood;
};

const FoodMeta = ({ food }: FoodMetaProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = searchFoodStyles[isDark ? 'dark' : 'light'];
  const { colors } = theme;

  return (
    <Text style={styles.meta}>
      {`${food.kcal} kcal · 100g · `}
      <Text style={[styles.macroLetter, { color: colors.carb }]}>C</Text>
      {` ${formatAmount(food.carb)}g · `}
      <Text style={[styles.macroLetter, { color: colors.protein }]}>P</Text>
      {` ${formatAmount(food.protein)}g · `}
      <Text style={[styles.macroLetter, { color: colors.fat }]}>G</Text>
      {` ${formatAmount(food.fat)}g`}
    </Text>
  );
};

type FoodRowProps = {
  food: CatalogFood;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

const FoodRow = ({
  food,
  favorite,
  onPress,
  onToggleFavorite,
}: FoodRowProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = searchFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Adicionar ${food.name}`}
        onPress={() => {
          Keyboard.dismiss();
          onPress();
        }}
        style={styles.rowMain}
      >
        <Text style={styles.emoji}>{food.emoji}</Text>
        <View style={styles.body}>
          <Text style={styles.name}>{food.name}</Text>
          <FoodMeta food={food} />
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          favorite
            ? `Remover ${food.name} dos favoritos`
            : `Favoritar ${food.name}`
        }
        accessibilityState={{ selected: favorite }}
        hitSlop={8}
        onPress={onToggleFavorite}
        style={styles.starHit}
      >
        <Icon
          name={favorite ? 'star' : 'star-regular'}
          size={16}
          color={favorite ? theme.colors.fat : theme.colors.secondaryText}
        />
      </Pressable>
    </View>
  );
};

const Separator = () => {
  const { isDark } = useNavigationTheme();
  const styles = searchFoodStyles[isDark ? 'dark' : 'light'];

  return <View style={styles.separator} />;
};

type FoodCountFooterProps = {
  count: number;
};

const FoodCountFooter = ({ count }: FoodCountFooterProps) => {
  const { isDark } = useNavigationTheme();
  const styles = searchFoodStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.footer}>
      <Text style={styles.footerLabel}>{formatFoodCount(count)}</Text>
    </View>
  );
};

type SearchFoodProps = StackScreenProps<StackParamList, 'SearchFood'>;

const SearchFood = ({ navigation, route }: SearchFoodProps) => {
  const { mealId, subtitle } = route.params;
  useBatchDiscardGuard(navigation, mealId);
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const styles = searchFoodStyles[isDark ? 'dark' : 'light'];
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FoodFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(catalog.filter(food => food.favorite).map(food => food.id)),
  );
  const filtered = filterCatalogFoods({
    foods: catalog,
    query,
    filter,
    favoriteIds,
  });

  const toggleFavorite = (id: string) => {
    setFavoriteIds(current => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Back onPress={navigation.goBack} />
          <ScreenHeader.TextColumn>
            <ScreenHeader.Title>Buscar Alimento</ScreenHeader.Title>
            <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
          </ScreenHeader.TextColumn>
        </ScreenHeader.Row>
      </ScreenHeader.Root>
      <View style={styles.toolbar}>
        <Input.Content>
          <Input.Icon name="search" />
          <Input.TextInput
            accessibilityLabel="Buscar alimento"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Buscar alimento..."
            value={query}
            onChangeText={setQuery}
          />
        </Input.Content>
        <View style={styles.pills}>
          <Pill.Root
            accessibilityLabel="Todos"
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
          >
            <Pill.Label>Todos</Pill.Label>
          </Pill.Root>
          <Pill.Root
            accessibilityLabel="Favoritos"
            selected={filter === 'favorites'}
            onPress={() => setFilter('favorites')}
          >
            <Icon name="star" size={14} color={theme.colors.fat} />
            <Pill.Label>Favoritos</Pill.Label>
          </Pill.Root>
        </View>
      </View>
      <FlatList
        data={filtered}
        extraData={favoriteIds}
        keyExtractor={food => food.id}
        renderItem={({ item }) => (
          <FoodRow
            food={item}
            favorite={favoriteIds.has(item.id)}
            onPress={() =>
              navigation.navigate('AddFood', {
                mealId,
                subtitle,
                catalogFoodId: item.id,
              })
            }
            onToggleFavorite={() => {
              toggleFavorite(item.id);
              Keyboard.dismiss();
            }}
          />
        )}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={<FoodCountFooter count={filtered.length} />}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        persistentScrollbar={false}
      />
    </View>
  );
};

export default SearchFood;
