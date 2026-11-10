import { describe, expect, it } from 'vitest';
import { isSameDay } from './date';

describe('isSameDay', () => {
  it('casa o mesmo dia civil local e ignora a hora', () => {
    const morning = new Date(2026, 10, 4, 0, 0, 0);
    const night = new Date(2026, 10, 4, 23, 59, 0);

    expect(isSameDay(morning, night)).toBe(true);
  });

  it('rejeita outro dia', () => {
    expect(isSameDay(new Date(2026, 10, 4), new Date(2026, 10, 5))).toBe(false);
  });

  it('rejeita Date inválido', () => {
    const invalid = new Date('não é data');

    expect(isSameDay(invalid, invalid)).toBe(false);
    expect(isSameDay(invalid, new Date(2026, 10, 4))).toBe(false);
  });
});
