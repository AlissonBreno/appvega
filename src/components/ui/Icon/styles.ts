import { Platform, StyleSheet } from 'react-native';

/**
 * iOS resolve a família pelo PostScript name.
 * Android resolve pelo nome do arquivo em assets/fonts, sem extensão.
 */
const fontFamily = Platform.select({
  ios: 'FontAwesome5Pro-Light',
  android: 'FontAwesome5_Pro_Light',
  default: 'FontAwesome5Pro-Light',
});

const regularFontFamily = Platform.select({
  ios: 'FontAwesome5Pro-Regular',
  android: 'FontAwesome5_Pro_Regular',
  default: 'FontAwesome5Pro-Regular',
});

const brandsFontFamily = Platform.select({
  ios: 'FontAwesome5Brands-Regular',
  android: 'FontAwesome5_Pro_Brands',
  default: 'FontAwesome5Brands-Regular',
});

export const styles = StyleSheet.create({
  glyph: {
    fontFamily,
    textAlign: 'center',
    includeFontPadding: false,
  },
  regularGlyph: {
    fontFamily: regularFontFamily,
  },
  brandGlyph: {
    fontFamily: brandsFontFamily,
  },
});
