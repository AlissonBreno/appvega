import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    row: {
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
  });
};

export const mealCardStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
