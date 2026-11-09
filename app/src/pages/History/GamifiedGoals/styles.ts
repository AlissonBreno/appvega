import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    card: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    iconBadge: {
      width: 48,
      height: 48,
      borderRadius: 9999,
      backgroundColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueGroup: {
      alignItems: 'center',
      gap: 2,
    },
    value: {
      fontSize: 22,
      lineHeight: 25,
      textAlign: 'center',
      color: colors.primaryText,
      ...fonts.bold,
    },
    unit: {
      fontSize: 14,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.light,
    },
    caption: {
      fontSize: 12,
      lineHeight: 21,
      textAlign: 'center',
      color: colors.primaryText,
      ...fonts.medium,
    },
  });
};

export const gamifiedGoalsStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
