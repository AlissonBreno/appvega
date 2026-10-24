import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    content: {
      paddingTop: 24,
      paddingHorizontal: 16,
      gap: 24,
    },
    meals: {
      gap: 16,
    },
    mealsTitle: {
      fontSize: 20,
      lineHeight: 25,
      color: colors.primaryText,
      ...fonts.bold,
    },
  });
};

export const homeStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
