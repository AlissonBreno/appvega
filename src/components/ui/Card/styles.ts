import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    card: {
      borderRadius: 20,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
      padding: 24,
      gap: 16,
    },
    sectionTitle: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
  });
};

export const cardStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
