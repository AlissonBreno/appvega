import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 9999,
      backgroundColor: colors.foreground,
    },
    selected: {
      backgroundColor: colors.primaryText,
    },
    label: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    labelSelected: {
      color: colors.background,
    },
  });
};

export const pillStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
