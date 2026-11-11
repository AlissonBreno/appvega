import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { darkTheme } from './tokens';
import { applyScheme, colorVariables, cssVariableName, mountShell, resolveInitialScheme } from './scheme';

describe('scheme', () => {
  it('escolhe dark só quando o sistema é escuro', () => {
    expect(resolveInitialScheme(true)).toBe('dark');
    expect(resolveInitialScheme(false)).toBe('light');
  });

  it('grava uma variável CSS por cor do tema do app', () => {
    const props: Record<string, string> = {};
    const target = {
      style: {
        setProperty: (name: string, value: string) => {
          props[name] = value;
        },
      },
    };

    expect(cssVariableName('primaryText')).toBe('--primary-text');
    expect(cssVariableName('foreground2')).toBe('--foreground2');

    applyScheme('dark', target);

    expect(props['--background']).toBe('#020617');
    expect(props['--primary']).toBe(darkTheme.colors.primary);
    expect(props['--toast-danger']).toBe(darkTheme.colors.toast.danger);
    expect(props).toEqual(colorVariables('dark'));
  });

  it('pinta a janela e o root com background', () => {
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

    expect(props['--background']).toBe('#F5F5F5');
    expect(root.style).toEqual({
      margin: '0',
      minHeight: '100%',
      background: 'var(--background)',
    });

    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    expect(html).toContain('margin: 0');
    expect(html).toContain('min-height: 100%');
    expect(html).toContain('background: var(--background)');
  });
});
