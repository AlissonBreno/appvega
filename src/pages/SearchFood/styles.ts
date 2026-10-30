import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    toolbar: {
      gap: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    pills: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 9999,
      backgroundColor: colors.foreground,
    },
    pillSelected: {
      backgroundColor: colors.primaryText,
    },
    pillLabel: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    pillLabelSelected: {
      color: colors.background,
    },
    list: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    rowMain: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingVertical: 16,
    },
    starHit: {
      justifyContent: 'center',
      paddingRight: 16,
      paddingVertical: 16,
    },
    emoji: {
      fontSize: 24,
      lineHeight: 28,
    },
    body: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    meta: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.light,
    },
    macroLetter: {
      fontSize: 12,
      lineHeight: 17,
      ...fonts.medium,
    },
    separator: {
      height: 1,
      backgroundColor: colors.border,
    },
    footer: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    footerLabel: {
      fontSize: 12,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
};

export const searchFoodStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
