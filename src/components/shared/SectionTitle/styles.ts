import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    title: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
  });
};

export const sectionTitleStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
