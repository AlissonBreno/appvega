import { StyleSheet } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

export const dailyCaloriesLayout = {
  chartHeight: 200,
  yAxisWidth: 44,
  yLabelLineHeight: 17,
  dashHeight: 2,
} as const;

const createStyles = (theme: Theme) => {
  const { colors, fonts } = theme;
  const { chartHeight, yAxisWidth, yLabelLineHeight, dashHeight } =
    dailyCaloriesLayout;

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    goal: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 2,
    },
    goalValue: {
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      ...fonts.bold,
    },
    goalUnit: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.light,
    },
    chartRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 8,
      height: chartHeight,
    },
    yAxis: {
      width: yAxisWidth,
      height: chartHeight,
    },
    yLabel: {
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'right',
      fontSize: 12,
      lineHeight: yLabelLineHeight,
      color: colors.secondaryText,
      ...fonts.medium,
    },
    plot: {
      flex: 1,
      height: chartHeight,
    },
    bars: {
      flexDirection: 'row',
      height: chartHeight,
      zIndex: 1,
    },
    barSlot: {
      flex: 1,
      height: chartHeight,
      alignItems: 'center',
    },
    bar: {
      position: 'absolute',
      bottom: 0,
      left: '12%',
      right: '12%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    goalLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: dashHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dash: {
      width: 6,
      height: dashHeight,
      borderRadius: 9999,
      backgroundColor: colors.primary,
    },
    dayRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    yAxisSpacer: {
      width: yAxisWidth,
    },
    dayLabels: {
      flex: 1,
      flexDirection: 'row',
    },
    dayLabel: {
      flex: 1,
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 17,
      color: colors.secondaryText,
      ...fonts.medium,
    },
  });
};

export const dailyCaloriesStyles = {
  dark: createStyles(themes.dark),
  light: createStyles(themes.light),
};
