import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    save: {
      opacity: 1,
      borderWidth: 0,
      backgroundColor: colors.primaryText,
    },
    saveLabel: {
      color: colors.background,
    },
  });
};

export const dailyGoalsStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
