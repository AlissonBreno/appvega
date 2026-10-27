import { useThemePreference } from '~/hooks/useThemePreference';
import { themes } from '~/styles/theme';
import type { Theme } from '~/types/Theme';

type NavigationTheme = {
  isDark: boolean;
  theme: Theme;
};

/**
 * Tema resolvido para a navegação (barra, header). Lê a preferência do
 * ThemeProvider — esquema do sistema até o usuário alternar — e devolve
 * o slot Dark ou Light já existente em `styles/theme`.
 */
export const useNavigationTheme = (): NavigationTheme => {
  const { isDark } = useThemePreference();

  return {
    isDark,
    theme: themes[isDark ? 'dark' : 'light'],
  };
};
