import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 16,
    },
    column: {
      flex: 1,
      alignItems: 'center',
      gap: 8,
    },
    emoji: {
      fontSize: 32,
      lineHeight: 40,
      textAlign: 'center',
    },
    valueGroup: {
      alignItems: 'center',
      gap: 2,
    },
    value: {
      fontSize: 20,
      lineHeight: 25,
      textAlign: 'center',
      color: colors.primaryText,
      ...fonts.bold,
    },
    label: {
      fontSize: 14,
      lineHeight: 21,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.light,
    },
  });
};

export const macroAverageStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
