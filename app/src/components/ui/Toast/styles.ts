import { StyleSheet } from 'react-native';

import { TAB_BOTTOM_OFFSET } from '~/components/layout/FloatingTabBar/styles';
import { themes } from '~/styles/theme';

const toastTextColor = themes.dark.colors.primaryText;

export const styles = StyleSheet.create({
  // A faixa corta a subida: o banner nasce abaixo desta borda e não cobre a tab.
  slot: {
    overflow: 'hidden',
    marginBottom: TAB_BOTTOM_OFFSET,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: toastTextColor,
    ...themes.dark.fonts.light,
  },
});

export const TOAST_TEXT_COLOR = toastTextColor;
