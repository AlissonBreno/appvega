import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    goalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    goalCopy: {
      flex: 1,
      gap: 4,
    },
    goalLabel: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    goalTotal: {
      fontSize: 14,
      lineHeight: 21,
      ...fonts.light,
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 8,
      gap: 8,
      borderColor: colors.border,
    },
    stepperValue: {
      minWidth: 40,
      fontSize: 13,
      lineHeight: 20,
      textAlign: 'center',
      color: colors.primaryText,
      ...fonts.light,
    },
  });
};

export const goalRowStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
