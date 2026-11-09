import { describe, expect, it } from 'vitest';
import { tokenNames, tokens } from './tokens';
import { applyScheme, cssVariableName, resolveInitialScheme } from './scheme';

describe('scheme', () => {
  it('escolhe dark só quando o sistema é escuro', () => {
    expect(resolveInitialScheme(true)).toBe('dark');
    expect(resolveInitialScheme(false)).toBe('light');
  });

  it('grava uma variável CSS por token no alvo', () => {
    const props: Record<string, string> = {};
    const target = {
      style: {
        setProperty: (name: string, value: string) => {
          props[name] = value;
        },
      },
    };

    expect(cssVariableName('surface/app')).toBe('--surface-app');
    expect(cssVariableName('avatar/gradient-end')).toBe('--avatar-gradient-end');

    applyScheme('dark', target);

    expect(props['--surface-app']).toBe('#020617');
    expect(props['--avatar-gradient-end']).toBe('#10B981');
    expect(Object.keys(props)).toEqual(tokenNames.map(cssVariableName));
    tokenNames.forEach(name => {
      expect(props[cssVariableName(name)]).toBe(tokens.dark[name]);
    });
  });
});
