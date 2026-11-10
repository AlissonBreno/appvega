import { describe, expect, it } from 'vitest';
import { formatToday } from './formatToday';
import { showsTabBar } from './showsTabBar';
import { weekDaysAround } from './weekDays';

describe('formatToday', () => {
  it('capitaliza a data de hoje em pt-BR', () => {
    const label = formatToday(new Date(2026, 10, 9));

    expect(label.charAt(0)).toBe(label.charAt(0).toLocaleUpperCase('pt-BR'));
    expect(label.toLowerCase()).toContain('novembro');
    expect(label).toContain('9');
  });
});

describe('weekDaysAround', () => {
  it('centraliza o dia selecionado entre sete iniciais', () => {
    const days = weekDaysAround(new Date(2026, 10, 9));

    expect(days).toHaveLength(7);
    expect(days[3].date.getDate()).toBe(9);
    expect(days.map(day => day.initial)).toEqual(['S', 'S', 'D', 'S', 'T', 'Q', 'Q']);
    expect(days[3].label).toBe('09');
  });
});

describe('showsTabBar', () => {
  it('mostra a navegação em Início, Histórico e Perfil; no desktop também em buscar/adicionar', () => {
    expect(showsTabBar('/')).toBe(true);
    expect(showsTabBar('/historico')).toBe(true);
    expect(showsTabBar('/perfil')).toBe(true);
    expect(showsTabBar('/login')).toBe(false);
    expect(showsTabBar('/buscar')).toBe(false);
    expect(showsTabBar('/buscar', true)).toBe(true);
    expect(showsTabBar('/adicionar', true)).toBe(true);
  });
});
