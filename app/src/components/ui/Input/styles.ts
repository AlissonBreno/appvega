import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    field: {
      gap: 8,
    },
    label: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    content: {
      minHeight: 52,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.formsBackground,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.primaryText,
      paddingVertical: 14,
      ...fonts.light,
    },
  });
};

export const inputStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
