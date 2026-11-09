import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    version: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      textAlign: 'center',
      alignSelf: 'stretch',
      ...fonts.light,
    },
    aboutBody: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      textAlign: 'center',
      alignSelf: 'stretch',
      ...fonts.light,
    },
    card: {
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      paddingTop: 36,
      paddingBottom: 36,
    },
    sectionTitle: {
      fontSize: 20,
    },
  });
};

export const appAboutStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
