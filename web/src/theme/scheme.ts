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
