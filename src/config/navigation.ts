import type {
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type { StackNavigationOptions } from '@react-navigation/stack';

import type { IconName } from '~/components/ui/Icon';
import type { TabParamList } from '~/types/Navigation';

/**
 * Tokens visuais derivados do design system (VEGA). Mantidos aqui para
 * centralizar a aparência da navegação. Slot Light por ora; tema dinâmico
 * pode ser plugado depois.
 */
const palette = {
  surfaceHeader: '#FFFFFF',
  textPrimary: '#0F172A',
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

export const tabIcons: Record<keyof TabParamList, IconName> = {
  Home: 'home',
  Profile: 'user-cog',
};

export const tabNavigatorOptions: BottomTabNavigationOptions = {
  headerStyle: {
    backgroundColor: palette.surfaceHeader,
  },
  headerTintColor: palette.textPrimary,
  tabBarLabelVisibilityMode: 'unlabeled',
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
};
