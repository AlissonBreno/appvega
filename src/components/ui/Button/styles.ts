import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    root: {
      borderRadius: 12,
      borderWidth: 1,
      minHeight: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      opacity: 0.55,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    label: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
};

export const buttonStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
