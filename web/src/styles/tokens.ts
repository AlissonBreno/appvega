/**
 * Mesmo contrato de `app/src/styles/theme.ts` e `app/src/types/Theme.ts`.
 * No browser a família Circular Std agrupa os cortes Book/Medium/Bold/Black.
 */

export type Scheme = 'dark' | 'light';

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Font = {
  fontFamily: string;
  fontWeight?: FontWeight;
};

export type Fonts = {
  light: Font;
  medium: Font;
  bold: Font;
  black: Font;
};

export type ToastColors = {
  danger: string;
  success: string;
  warning: string;
};

export type Colors = {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  primaryText: string;
  secondaryText: string;
  background: string;
  foreground: string;
  foreground2: string;
  formsBackground: string;
  border: string;
  toast: ToastColors;
  carb: string;
  protein: string;
  fat: string;
};

export type Theme = {
  colors: Colors;
  fonts: Fonts;
};

const fonts: Fonts = {
  light: { fontFamily: 'Circular Std', fontWeight: '400' },
  medium: { fontFamily: 'Circular Std', fontWeight: '500' },
  bold: { fontFamily: 'Circular Std', fontWeight: '700' },
  black: { fontFamily: 'Circular Std', fontWeight: '900' },
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
    foreground2: '#334155',
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
    foreground2: '#F1F5F9',
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
