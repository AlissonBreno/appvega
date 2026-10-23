import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

function createStyles(theme: Theme) {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      borderRadius: 20,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
      padding: 24,
      gap: 16,
    },
  });
}

export const cardStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
