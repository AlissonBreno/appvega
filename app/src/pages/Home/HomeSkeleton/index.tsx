import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { styles } from './styles';

const MEAL_PLACEHOLDERS = [0, 1, 2, 3];
const MACRO_PLACEHOLDERS = [0, 1, 2];

const HomeSkeleton = () => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;

  return (
    <SkeletonPlaceholder
      backgroundColor={colors.border}
      highlightColor={colors.foreground}
      borderRadius={16}
      speed={1200}
    >
      <View style={styles.root}>
        <View style={styles.progress}>
          <View style={styles.progressRow}>
            <SkeletonPlaceholder.Item
              width={128}
              height={128}
              borderRadius={9999}
            />
            <View style={styles.goalLines}>
              <SkeletonPlaceholder.Item
                width="72%"
                height={24}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                width="46%"
                height={14}
                borderRadius={8}
              />
            </View>
          </View>
          <View style={styles.macros}>
            {MACRO_PLACEHOLDERS.map(column => (
              <View key={column} style={styles.macro}>
                <SkeletonPlaceholder.Item
                  width="80%"
                  height={16}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={6}
                  borderRadius={9999}
                />
                <SkeletonPlaceholder.Item
                  width="70%"
                  height={12}
                  borderRadius={8}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.meals}>
          <SkeletonPlaceholder.Item width={112} height={20} borderRadius={8} />
          {MEAL_PLACEHOLDERS.map(meal => (
            <View key={meal} style={styles.mealCard}>
              <SkeletonPlaceholder.Item
                width={36}
                height={36}
                borderRadius={9999}
              />
              <View style={styles.mealLines}>
                <SkeletonPlaceholder.Item
                  width="68%"
                  height={16}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width="36%"
                  height={12}
                  borderRadius={8}
                />
              </View>
              <View style={styles.kcal}>
                <SkeletonPlaceholder.Item
                  width={36}
                  height={16}
                  borderRadius={8}
                />
                <SkeletonPlaceholder.Item
                  width={28}
                  height={12}
                  borderRadius={8}
                />
              </View>
              <SkeletonPlaceholder.Item
                width={36}
                height={36}
                borderRadius={9999}
              />
            </View>
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HomeSkeleton;
