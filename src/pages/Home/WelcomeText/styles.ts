import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    title: {
      fontSize: 24,
      lineHeight: 32,
      color: colors.primaryText,
      ...fonts.bold,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
  });
};

export const welcomeTextStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
