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
    primary: '#10B37D', // brand/green
    secondary: '#6366F1', // accent/carb
    rgb: '16, 179, 125', // brand/green em rgb
    error: '#FF5878', // state/above
    primaryText: '#F8FAFC', // text/primary
    secondaryText: '#7F8DA2', // text/muted
    background: '#020617', // surface/app
    foreground: '#0F172A', // surface/card
    formsBackground: '#0F172A', // surface/header
    border: '#1E293B', // border/subtle
    toast: {
      danger: '#FF5878', // state/above
      success: '#10B37D', // brand/green
      warning: '#F2C614', // accent/fat
    },
  },
  fonts,
};

export const lightTheme: Theme = {
  colors: {
    primary: '#10B37D', // brand/green
    secondary: '#6366F1', // accent/carb
    rgb: '16, 179, 125', // brand/green em rgb
    error: '#FF5878', // state/above
    primaryText: '#0F172A', // text/primary
    secondaryText: '#64748B', // text/muted
    background: '#F5F5F5', // surface/app
    foreground: '#FFFFFF', // surface/card
    formsBackground: '#FFFFFF', // surface/header
    border: '#E2E8F0', // border/subtle
    toast: {
      danger: '#FF5878', // state/above
      success: '#10B37D', // brand/green
      warning: '#F2C614', // accent/fat
    },
  },
  fonts,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export default darkTheme;
