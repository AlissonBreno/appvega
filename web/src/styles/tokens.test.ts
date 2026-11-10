import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from './tokens';

describe('tokens', () => {
  it('repete as cores e as fontes do tema do app', () => {
    expect(darkTheme).toEqual({
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
      fonts: {
        light: { fontFamily: 'Circular Std', fontWeight: '400' },
        medium: { fontFamily: 'Circular Std', fontWeight: '500' },
        bold: { fontFamily: 'Circular Std', fontWeight: '700' },
        black: { fontFamily: 'Circular Std', fontWeight: '900' },
      },
    });

    expect(lightTheme.colors.primaryText).toBe('#0F172A');
    expect(lightTheme.colors.secondaryText).toBe('#64748B');
    expect(lightTheme.colors.background).toBe('#F5F5F5');
    expect(lightTheme.colors.foreground).toBe('#FFFFFF');
    expect(lightTheme.colors.foreground2).toBe('#F1F5F9');
    expect(lightTheme.colors.formsBackground).toBe('#FFFFFF');
    expect(lightTheme.colors.border).toBe('#E2E8F0');
    expect(lightTheme.fonts).toBe(darkTheme.fonts);
  });
});
