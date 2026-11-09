export const tokenNames = [
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
] as const;

export type TokenName = (typeof tokenNames)[number];

export type Scheme = 'dark' | 'light';

const dark = {
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
} as const satisfies Record<TokenName, string>;

const light = {
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
} as const satisfies Record<TokenName, string>;

export const tokens = { dark, light };

export const fontFamily = {
  circular: 'Circular Std',
  mono: 'Fira Code',
} as const;

export const typography = {
  display: { fontFamily: fontFamily.circular, fontSize: 32, fontWeight: 'bold', lineHeight: 1.15 },
  h1: { fontFamily: fontFamily.circular, fontSize: 24, fontWeight: 'bold', lineHeight: 1.2 },
  h2: { fontFamily: fontFamily.circular, fontSize: 20, fontWeight: 'bold', lineHeight: 1.25 },
  h3: { fontFamily: fontFamily.circular, fontSize: 16, fontWeight: 'medium', lineHeight: 1.3 },
  body: { fontFamily: fontFamily.circular, fontSize: 16, fontWeight: 'regular', lineHeight: 1.6 },
  bodySm: { fontFamily: fontFamily.circular, fontSize: 14, fontWeight: 'regular', lineHeight: 1.5 },
  caption: { fontFamily: fontFamily.circular, fontSize: 12, fontWeight: 'medium', lineHeight: 1.4 },
  mono: { fontFamily: fontFamily.circular, fontSize: 13, fontWeight: 'regular', lineHeight: 1.5 },
} as const;

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 } as const;

export const radius = { sm: 8, default: 12, lg: 16, xl: 20, full: 9999 } as const;
