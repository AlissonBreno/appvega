import { useColorScheme } from 'react-native';

import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

type NavigationTheme = {
  isDark: boolean;
  theme: Theme;
};

/**
 * Tema resolvido para a navegação (barra, header). Lê o esquema do sistema
 * e devolve o slot Dark ou Light já existente em `styles/theme`.
 */
export const useNavigationTheme = (): NavigationTheme => {
  const isDark = useColorScheme() === 'dark';

  return {
    isDark,
    theme: themes[isDark ? 'dark' : 'light'],
  };
};
