import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { tokenNames, tokens } from './tokens';
import { applyScheme, cssVariableName, mountShell, resolveInitialScheme } from './scheme';

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

  it('pinta a janela e o root com surface/app', () => {
    const props: Record<string, string> = {};
    const root = {
      style: { margin: '', minHeight: '', background: '' },
    };

    mountShell(
      {
        style: {
          setProperty: (name: string, value: string) => {
            props[name] = value;
          },
        },
      },
      root,
      false,
    );

    expect(props['--surface-app']).toBe('#F5F5F5');
    expect(root.style).toEqual({
      margin: '0',
      minHeight: '100%',
      background: 'var(--surface-app)',
    });

    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    expect(html).toContain('margin: 0');
    expect(html).toContain('min-height: 100%');
    expect(html).toContain('background: var(--surface-app)');
  });
});
