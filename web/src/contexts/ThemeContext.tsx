import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { applyScheme, resolveInitialScheme } from '~/styles/scheme';
import type { Scheme } from '~/styles/tokens';

type ThemeValue = {
  scheme: Scheme;
  setScheme: (scheme: Scheme) => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [scheme, setSchemeState] = useState<Scheme>(() =>
    resolveInitialScheme(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false),
  );

  const setScheme = (next: Scheme) => {
    setSchemeState(next);
    applyScheme(next, document.documentElement);
  };

  const value = useMemo(() => ({ scheme, setScheme }), [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme deve ficar dentro de ThemeProvider');
  }

  return value;
};
