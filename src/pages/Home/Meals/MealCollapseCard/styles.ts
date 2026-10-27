import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    summary: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    emoji: {
      fontSize: 28,
      lineHeight: 32,
    },
    titleColumn: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    value: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    caption: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.light,
    },
    kcalColumn: {
      alignItems: 'center',
    },
    addButton: {
      width: 36,
      height: 36,
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryText,
    },
    collapseButton: {
      width: 24,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },
    collapseButtonExpanded: {
      transform: [{ rotate: '180deg' }],
    },
    foodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 12,
    },
    foodBody: {
      flex: 1,
      gap: 4,
    },
    foodTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    quantity: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    macros: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    macro: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    macroLetter: {
      fontSize: 12,
      lineHeight: 17,
      ...fonts.medium,
    },
    macroValue: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.light,
    },
    separator: {
      height: 1,
      marginHorizontal: -24,
      backgroundColor: colors.border,
    },
    subtotal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: -24,
      marginBottom: -24,
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: colors.border,
    },
  });
};

export const mealCollapseCardStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
