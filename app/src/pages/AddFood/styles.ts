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
    identity: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    emoji: {
      fontSize: 32,
      lineHeight: 36,
    },
    name: {
      flex: 1,
      fontSize: 24,
      lineHeight: 32,
      color: colors.primaryText,
      ...fonts.bold,
    },
    kcalBox: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderRadius: 16,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
    },
    kcalValue: {
      fontSize: 32,
      lineHeight: 37,
      color: colors.primaryText,
      ...fonts.bold,
    },
    kcalLabel: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    macros: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    macro: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
    },
    macroEmoji: {
      fontSize: 20,
      lineHeight: 24,
    },
    macroValue: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    macroLabel: {
      fontSize: 12,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.medium,
    },
    table: {
      borderWidth: 1,
      borderRadius: 16,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    tableTitle: {
      flex: 1,
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    factRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    factLabel: {
      flex: 1,
      fontSize: 14,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.light,
    },
    factValue: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    quantity: {
      gap: 16,
    },
    quantityTitle: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
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
    grams: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    shortcuts: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    footer: {
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    confirm: {
      opacity: 1,
      borderWidth: 0,
      backgroundColor: colors.primaryText,
    },
    confirmLabel: {
      color: colors.background,
    },
    quickAdd: {
      opacity: 1,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
    },
    quickAddLabel: {
      color: colors.primaryText,
    },
  });
};

export const addFoodStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
