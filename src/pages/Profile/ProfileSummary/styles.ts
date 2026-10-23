import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;

  return StyleSheet.create({
    identity: {
      alignItems: 'center',
      gap: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    avatarGlow: {
      borderRadius: 9999,
      shadowColor: colors.secondary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 6,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 9999,
      overflow: 'hidden',
      experimental_backgroundImage: [
        {
          type: 'linear-gradient',
          direction: 'to bottom right',
          colorStops: [
            { color: colors.secondary },
            { color: colors.primary },
          ],
        },
      ],
    },
    avatarShine: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    identityCopy: {
      alignItems: 'center',
      gap: 4,
    },
    name: {
      fontSize: 24,
      lineHeight: 29,
      textAlign: 'center',
      color: colors.primaryText,
      ...fonts.bold,
    },
    subtitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    subtitle: {
      fontSize: 14,
      lineHeight: 21,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.light,
    },
    stats: {
      flexDirection: 'row',
      gap: 8,
    },
    stat: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: 'center',
      gap: 4,
    },
    statValue: {
      fontSize: 18,
      lineHeight: 21,
      ...fonts.medium,
    },
    caption: {
      fontSize: 14,
      lineHeight: 17,
      textAlign: 'center',
      color: colors.secondaryText,
      ...fonts.light,
    },
  });
};

export const profileSummaryStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
