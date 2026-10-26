import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    viewColumn: {
      gap: 24,
    },
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    circularProgressChart: {
      width: 128,
      height: 128,
      borderRadius: 9999,
      borderWidth: 8,
      borderColor: colors.border,
    },
    goalTitle: {
      fontSize: 24,
      lineHeight: 32,
      color: colors.primaryText,
      ...fonts.bold,
    },
    goalValue: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    viewMacroAverage: {
      flexDirection: 'row',
      gap: 16,
    },
    column: {
      flex: 1,
      gap: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    emoji: {
      fontSize: 20,
      lineHeight: 24,
    },
    grams: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    caption: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
};

export const dailyProgressStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
