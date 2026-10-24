import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    list: {
      gap: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    day: {
      width: 36,
      flexShrink: 0,
      fontSize: 16,
      lineHeight: 26,
      color: colors.secondaryText,
      ...fonts.light,
    },
    bar: {
      flex: 1,
    },
    kcal: {
      width: 96,
      flexShrink: 0,
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 4,
    },
    kcalValue: {
      fontSize: 16,
      lineHeight: 26,
      ...fonts.bold,
    },
    kcalUnit: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.light,
    },
    legend: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 9999,
    },
    legendLabel: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
  });
};

export const weeklyPerformanceStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
