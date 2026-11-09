import { isSameDay, startOfDay } from './date';

describe('isSameDay', () => {
  test('is true for the same calendar day with different times', () => {
    const morning = new Date(2026, 10, 4, 8, 15);
    const night = new Date(2026, 10, 4, 23, 40);

    expect(isSameDay(morning, night)).toBe(true);
  });

  test('is false across midnight and across months', () => {
    expect(
      isSameDay(new Date(2026, 10, 4, 23, 59), new Date(2026, 10, 5, 0, 1)),
    ).toBe(false);
    expect(isSameDay(new Date(2026, 9, 31), new Date(2026, 10, 1))).toBe(false);
  });
});

describe('startOfDay', () => {
  test('returns local midnight and keeps the calendar day', () => {
    const date = new Date(2026, 10, 4, 15, 30, 45, 123);
    const start = startOfDay(date);

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(10);
    expect(start.getDate()).toBe(4);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(start.getSeconds()).toBe(0);
    expect(start.getMilliseconds()).toBe(0);
    expect(isSameDay(start, date)).toBe(true);
  });
});
