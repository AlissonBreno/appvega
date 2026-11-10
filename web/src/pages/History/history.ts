export type BarTone = 'above' | 'near' | 'within';

export const DAILY_BARS = [1050, 2320, 1400, 1700, 2150, 1650, 850];

export const WEEKLY_ROWS = [
  { day: 'Seg', kcal: 1820, tone: 'near' as const },
  { day: 'Ter', kcal: 2100, tone: 'above' as const },
  { day: 'Qua', kcal: 1950, tone: 'near' as const },
  { day: 'Qui', kcal: 1680, tone: 'within' as const },
  { day: 'Sex', kcal: 2200, tone: 'above' as const },
  { day: 'Sáb', kcal: 1900, tone: 'near' as const },
  { day: 'Dom', kcal: 1106, tone: 'within' as const },
];

export const barColorForKcal = (kcal: number): BarTone => {
  if (kcal > 2000) {
    return 'above';
  }

  if (kcal >= 1800) {
    return 'near';
  }

  return 'within';
};
