import { buildWeekDays, isGoalMet } from './weekDays';

const ANCHOR = new Date(2026, 10, 2);

describe('isGoalMet', () => {
  test('is true when eaten calories reach the daily goal', () => {
    expect(isGoalMet(2600, 2600)).toBe(true);
    expect(isGoalMet(2700, 2600)).toBe(true);
  });

  test('is false when eaten calories are below the daily goal', () => {
    expect(isGoalMet(1108, 2600)).toBe(false);
  });
});

describe('buildWeekDays', () => {
  test('builds a 7-day window centered on the selected date', () => {
    const days = buildWeekDays({
      selectedDate: ANCHOR,
      today: ANCHOR,
      caloriesEaten: 1108,
      dailyGoalKcal: 2600,
    });

    expect(days.map(day => ({
      weekdayInitial: day.weekdayInitial,
      dayNumber: day.dayNumber,
      selected: day.selected,
      goalMet: day.goalMet,
    }))).toEqual([
      { weekdayInitial: 'S', dayNumber: '30', selected: false, goalMet: false },
      { weekdayInitial: 'S', dayNumber: '31', selected: false, goalMet: false },
      { weekdayInitial: 'D', dayNumber: '01', selected: false, goalMet: false },
      { weekdayInitial: 'S', dayNumber: '02', selected: true, goalMet: false },
      { weekdayInitial: 'T', dayNumber: '03', selected: false, goalMet: false },
      { weekdayInitial: 'Q', dayNumber: '04', selected: false, goalMet: false },
      { weekdayInitial: 'Q', dayNumber: '05', selected: false, goalMet: false },
    ]);
  });

  test('marks goalMet only for today when consumption reaches 2600', () => {
    const days = buildWeekDays({
      selectedDate: ANCHOR,
      today: ANCHOR,
      caloriesEaten: 2600,
      dailyGoalKcal: 2600,
    });

    expect(days.map(day => day.goalMet)).toEqual([
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ]);
  });

  test('recenters the window around a different selected date', () => {
    const selectedDate = new Date(2026, 10, 5);
    const days = buildWeekDays({
      selectedDate,
      today: ANCHOR,
      caloriesEaten: 2600,
      dailyGoalKcal: 2600,
    });

    expect(days.map(day => day.dayNumber)).toEqual([
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
    ]);
    expect(days[3].selected).toBe(true);
    expect(days[0].goalMet).toBe(true);
    expect(days[3].goalMet).toBe(false);
  });
});
