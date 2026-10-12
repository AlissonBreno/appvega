import type {
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { StackNavigationOptions } from '@react-navigation/stack';

/**
 * Tokens visuais derivados do design system (VEGA). Mantidos aqui para
 * centralizar a aparência da navegação. Slot Light por ora; tema dinâmico
 * pode ser plugado depois.
 */
const palette = {
  surfaceHeader: '#FFFFFF',
  textPrimary: '#0F172A',
  navActive: '#0F172A',
  textMuted: '#64748B',
  borderSubtle: '#E2E8F0',
};

export const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: palette.surfaceHeader,
  },
  headerTintColor: palette.textPrimary,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export const tabNavigatorOptions: BottomTabNavigationOptions = {
  headerStyle: {
    backgroundColor: palette.surfaceHeader,
  },
  headerTintColor: palette.textPrimary,
  tabBarActiveTintColor: palette.navActive,
  tabBarInactiveTintColor: palette.textMuted,
  tabBarStyle: {
    backgroundColor: palette.surfaceHeader,
    borderTopColor: palette.borderSubtle,
  },
};
