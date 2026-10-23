import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

function createStyles(theme: Theme) {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingBottom: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.foreground,
    },
    headerIcon: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerCopy: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 20,
      lineHeight: 25,
      color: colors.primaryText,
      ...fonts.bold,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
  });
}

export const screenHeaderStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
