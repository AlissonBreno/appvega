import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconWell: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
    },
    copy: {
      flex: 1,
      gap: 2,
    },
    rowTitle: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    caption: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
};

export const toolsStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
