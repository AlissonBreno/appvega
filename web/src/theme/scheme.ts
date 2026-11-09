import { tokens, type Scheme, type TokenName } from './tokens';

export const resolveInitialScheme = (matchesDark: boolean): Scheme =>
  matchesDark ? 'dark' : 'light';

export const cssVariableName = (tokenName: string) =>
  `--${tokenName.replaceAll('/', '-')}`;

export const applyScheme = (
  scheme: Scheme,
  target: { style: { setProperty: (name: string, value: string) => void } },
) => {
  (Object.keys(tokens[scheme]) as TokenName[]).forEach(name => {
    target.style.setProperty(cssVariableName(name), tokens[scheme][name]);
  });
};

export const mountShell = (
  documentElement: { style: { setProperty: (name: string, value: string) => void } },
  root: { style: { margin: string; minHeight: string; background: string } },
  matchesDark: boolean,
) => {
  applyScheme(resolveInitialScheme(matchesDark), documentElement);
  root.style.margin = '0';
  root.style.minHeight = '100%';
  root.style.background = 'var(--surface-app)';
};
