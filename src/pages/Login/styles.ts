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
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      gap: 32,
    },
    welcome: {
      gap: 8,
    },
    welcomeTitle: {
      fontSize: 36,
      lineHeight: 36,
      color: colors.primaryText,
      ...fonts.bold,
    },
    welcomeSubtitle: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    form: {
      gap: 16,
    },
    signIn: {
      opacity: 1,
      borderWidth: 0,
      backgroundColor: colors.primaryText,
    },
    signInLabel: {
      color: colors.background,
    },
    signInIcon: {
      color: colors.background,
    },
    alternative: {
      gap: 16,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerLabel: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    google: {
      opacity: 1,
      borderColor: colors.border,
      backgroundColor: colors.foreground,
    },
    googleIcon: {
      color: colors.primaryText,
    },
    googleLabel: {
      color: colors.primaryText,
    },
  });
};

export const loginStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
