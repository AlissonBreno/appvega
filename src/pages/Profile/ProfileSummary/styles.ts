import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

function createStyles(theme: Theme) {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    identity: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 9999,
      overflow: 'hidden',
    },
    avatarBand: {
      flex: 1,
    },
    avatarBandStart: {
      backgroundColor: colors.avatarStart,
    },
    avatarBandEnd: {
      backgroundColor: colors.avatarEnd,
    },
    avatarShine: {
      position: 'absolute',
      right: 6,
      top: 8,
    },
    identityCopy: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.medium,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.light,
    },
    stats: {
      flexDirection: 'row',
      gap: 8,
    },
    stat: {
      flex: 1,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: 'center',
      gap: 4,
    },
    statValue: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.primaryText,
      ...fonts.bold,
    },
    caption: {
      fontSize: 12,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
}

export const profileSummaryStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
