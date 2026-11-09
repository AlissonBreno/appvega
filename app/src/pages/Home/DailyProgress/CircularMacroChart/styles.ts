import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      width: '100%',
      fontSize: 32,
      lineHeight: 37,
      color: colors.primaryText,
      textAlign: 'center',
      includeFontPadding: false,
      ...fonts.bold,
    },
    subtitle: {
      width: '100%',
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      textAlign: 'center',
      includeFontPadding: false,
      ...fonts.light,
    },
  });
};

export const circularMacroChartStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
