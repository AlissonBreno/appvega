import { describe, expect, it } from 'vitest';
import {
  fontFamily,
  radius,
  space,
  tokenNames,
  tokens,
  typography,
} from './tokens';

describe('tokens', () => {
  it('guarda os hex Dark e Light da fundação', () => {
    expect(tokenNames).toEqual([
      'surface/app',
      'surface/header',
      'surface/card',
      'surface/nested',
      'text/primary',
      'text/muted',
      'border/subtle',
      'track/progress',
      'nav/active',
      'brand/green',
      'accent/carb',
      'accent/protein',
      'accent/fat',
      'state/above',
      'state/near',
      'avatar/gradient-start',
      'avatar/gradient-end',
      'toast/danger',
      'toast/success',
      'toast/warning',
    ]);

    expect(tokens.dark).toEqual({
      'surface/app': '#020617',
      'surface/header': '#0F172A',
      'surface/card': '#0F172A',
      'surface/nested': '#334155',
      'text/primary': '#F8FAFC',
      'text/muted': '#7F8DA2',
      'border/subtle': '#1E293B',
      'track/progress': '#1E293B',
      'nav/active': '#F8FAFC',
      'brand/green': '#10B37D',
      'accent/carb': '#6366F1',
      'accent/protein': '#10B37D',
      'accent/fat': '#F2C614',
      'state/above': '#FF5878',
      'state/near': '#38BDF8',
      'avatar/gradient-start': '#38BDF8',
      'avatar/gradient-end': '#10B981',
      'toast/danger': '#FF5878',
      'toast/success': '#10B37D',
      'toast/warning': '#F2C614',
    });

    expect(tokens.light).toEqual({
      'surface/app': '#F5F5F5',
      'surface/header': '#FFFFFF',
      'surface/card': '#FFFFFF',
      'surface/nested': '#F1F5F9',
      'text/primary': '#0F172A',
      'text/muted': '#64748B',
      'border/subtle': '#E2E8F0',
      'track/progress': '#E2E8F0',
      'nav/active': '#0F172A',
      'brand/green': '#10B37D',
      'accent/carb': '#6366F1',
      'accent/protein': '#10B37D',
      'accent/fat': '#F2C614',
      'state/above': '#FF5878',
      'state/near': '#38BDF8',
      'avatar/gradient-start': '#38BDF8',
      'avatar/gradient-end': '#10B981',
      'toast/danger': '#FF5878',
      'toast/success': '#10B37D',
      'toast/warning': '#F2C614',
    });
  });

  it('guarda famílias, papéis, espaço e raio', () => {
    expect(fontFamily).toEqual({
      circular: 'Circular Std',
      mono: 'Fira Code',
    });

    expect(typography).toEqual({
      display: { fontFamily: 'Circular Std', fontSize: 32, fontWeight: 'bold', lineHeight: 1.15 },
      h1: { fontFamily: 'Circular Std', fontSize: 24, fontWeight: 'bold', lineHeight: 1.2 },
      h2: { fontFamily: 'Circular Std', fontSize: 20, fontWeight: 'bold', lineHeight: 1.25 },
      h3: { fontFamily: 'Circular Std', fontSize: 16, fontWeight: 'medium', lineHeight: 1.3 },
      body: { fontFamily: 'Circular Std', fontSize: 16, fontWeight: 'regular', lineHeight: 1.6 },
      bodySm: { fontFamily: 'Circular Std', fontSize: 14, fontWeight: 'regular', lineHeight: 1.5 },
      caption: { fontFamily: 'Circular Std', fontSize: 12, fontWeight: 'medium', lineHeight: 1.4 },
      mono: { fontFamily: 'Fira Code', fontSize: 13, fontWeight: 'regular', lineHeight: 1.5 },
    });

    expect(space).toEqual({ xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 });
    expect(radius).toEqual({ sm: 8, default: 12, lg: 16, xl: 20, full: 9999 });
  });
});
