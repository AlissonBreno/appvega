import type { Fonts, Theme } from '~/types/Theme';

/**
 * Tema do design system VEGA.
 *
 * Cores derivadas dos tokens semânticos do design system (slots Dark/Light).
 * Fontes mapeadas para a família Circular Std (arquivos em `assets/fonts`).
 * Nunca aplique hex direto em componentes — consuma sempre via tema.
 */

const fonts: Fonts = {
  light: { fontFamily: 'CircularStd-Book', fontWeight: '400' },
  medium: { fontFamily: 'CircularStd-Medium', fontWeight: '500' },
  bold: { fontFamily: 'CircularStd-Bold', fontWeight: '700' },
  black: { fontFamily: 'CircularStd-Black', fontWeight: '900' },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#10B37D',
    secondary: '#38BDF8',
    tertiary: '#6366F1',
    error: '#FF5878',
    primaryText: '#F8FAFC',
    secondaryText: '#7F8DA2',
    background: '#020617',
    foreground: '#0F172A',
    formsBackground: '#0F172A',
    border: '#1E293B',
    toast: {
      danger: '#FF5878',
      success: '#10B37D',
      warning: '#F2C614',
    },
    carb: '#6366F1',
    protein: '#10B37D',
    fat: '#F2C614',
  },
  fonts,
};

export const lightTheme: Theme = {
  colors: {
    primary: '#10B37D',
    secondary: '#38BDF8',
    tertiary: '#6366F1',
    error: '#FF5878',
    primaryText: '#0F172A',
    secondaryText: '#64748B',
    background: '#F5F5F5',
    foreground: '#FFFFFF',
    formsBackground: '#FFFFFF',
    border: '#E2E8F0',
    toast: {
      danger: '#FF5878',
      success: '#10B37D',
      warning: '#F2C614',
    },
    carb: '#6366F1',
    protein: '#10B37D',
    fat: '#F2C614',
  },
  fonts,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export default darkTheme;
