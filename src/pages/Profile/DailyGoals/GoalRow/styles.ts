import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    goalRow: {
      flexDirection: 'column',
      gap: 8,
      paddingVertical: 12,
    },
    goalRowLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    emoji: {
      fontSize: 18,
      lineHeight: 22,
    },
    goalLabel: {
      flex: 1,
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.light,
    },
    goalTotal: {
      fontSize: 16,
      lineHeight: 21,
      ...fonts.medium,
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepperButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
    },
    stepperInput: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      padding: 0,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 16,
      color: colors.primaryText,
      backgroundColor: colors.background,
      borderColor: colors.border,
      ...fonts.medium,
    },
  });
};

export const goalRowStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
