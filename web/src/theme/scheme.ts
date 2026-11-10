import { themes, type Scheme } from './tokens';

export const resolveInitialScheme = (matchesDark: boolean): Scheme =>
  matchesDark ? 'dark' : 'light';

const kebab = (key: string) => key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export const cssVariableName = (key: string) => `--${kebab(key)}`;

export const colorVariables = (scheme: Scheme): Record<string, string> => {
  const variables: Record<string, string> = {};

  Object.entries(themes[scheme].colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      variables[cssVariableName(key)] = value;
      return;
    }

    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
      variables[cssVariableName(`${key}-${nestedKey}`)] = nestedValue;
    });
  });

  return variables;
};

export const applyScheme = (
  scheme: Scheme,
  target: { style: { setProperty: (name: string, value: string) => void } },
) => {
  Object.entries(colorVariables(scheme)).forEach(([name, value]) => {
    target.style.setProperty(name, value);
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
  root.style.background = 'var(--background)';
};
