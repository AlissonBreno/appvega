import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    day: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 9999,
      borderWidth: 1.5,
      borderColor: 'transparent',
    },
    daySelected: {
      borderColor: colors.foreground,
    },
    weekday: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    weekdaySelected: {
      color: colors.primaryText,
    },
    dayNumber: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    dayNumberSelected: {
      color: colors.primaryText,
    },
    check: {
      height: 21,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export const weekDaySelectorStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
