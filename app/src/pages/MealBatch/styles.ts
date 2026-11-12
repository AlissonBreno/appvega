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
      paddingBottom: 16,
      gap: 24,
    },
    totals: {
      flexDirection: 'row',
      gap: 8,
      padding: 16,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
    },
    total: {
      flex: 1,
      alignItems: 'center',
    },
    totalValue: {
      fontSize: 20,
      lineHeight: 25,
      color: colors.primaryText,
      ...fonts.bold,
    },
    totalLabel: {
      fontSize: 12,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.medium,
    },
    list: {
      gap: 8,
    },
    addMore: {
      opacity: 1,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    addMoreLabel: {
      color: colors.primaryText,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
    },
    rowEmoji: {
      fontSize: 28,
      lineHeight: 32,
    },
    rowInfo: {
      flex: 1,
    },
    rowName: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    rowKcal: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    gramsField: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      height: 44,
      paddingHorizontal: 12,
      borderRadius: 12,
      backgroundColor: colors.border,
    },
    gramsInput: {
      minWidth: 48,
      padding: 0,
      textAlign: 'right',
      fontSize: 16,
      color: colors.primaryText,
      ...fonts.medium,
    },
    gramsUnit: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    removeButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
    },
    footer: {
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.foreground,
    },
    confirm: {
      opacity: 1,
      borderWidth: 0,
      backgroundColor: colors.primaryText,
    },
    confirmLabel: {
      color: colors.background,
    },
    disabled: {
      opacity: 0.6,
    },
  });
};

export const mealBatchStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
