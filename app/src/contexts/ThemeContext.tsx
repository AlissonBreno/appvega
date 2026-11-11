import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

export type ColorSchemePreference = 'dark' | 'light';

export type ThemePreferenceValue = {
  isDark: boolean;
  scheme: ColorSchemePreference;
  setScheme: (scheme: ColorSchemePreference) => void;
};

export const ThemeContext = createContext<ThemePreferenceValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ColorSchemePreference | null>(null);

  const scheme: ColorSchemePreference =
    override ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const setScheme = useCallback((next: ColorSchemePreference) => {
    setOverride(next);
  }, []);

  const value = useMemo(
    () => ({
      isDark: scheme === 'dark',
      scheme,
      setScheme,
    }),
    [scheme, setScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
