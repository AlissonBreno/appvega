import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    track: {
      height: 6,
      borderRadius: 9999,
      flexDirection: 'row',
      alignSelf: 'stretch',
      backgroundColor: colors.border,
      overflow: 'hidden',
    },
    segment: {
      height: 6,
    },
  });
};

export const macroProgressBarStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
