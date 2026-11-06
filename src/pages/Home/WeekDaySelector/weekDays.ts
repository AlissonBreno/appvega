import { isSameDay, startOfDay } from '~/utils/date';

const WEEKDAY_INITIALS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const;

export type WeekDay = {
  date: Date;
  weekdayInitial: string;
  dayNumber: string;
  selected: boolean;
  goalMet: boolean;
};

export const isGoalMet = (caloriesEaten: number, dailyGoalKcal: number) =>
  caloriesEaten >= dailyGoalKcal;

type BuildWeekDaysParams = {
  selectedDate: Date;
  today: Date;
  caloriesEaten: number;
  dailyGoalKcal: number;
};

export const buildWeekDays = ({
  selectedDate,
  today,
  caloriesEaten,
  dailyGoalKcal,
}: BuildWeekDaysParams): WeekDay[] => {
  const center = startOfDay(selectedDate);
  const todayDay = startOfDay(today);
  const todayGoalMet = isGoalMet(caloriesEaten, dailyGoalKcal);

  return Array.from({ length: 7 }, (_, index) => {
    const offset = index - 3;
    const date = new Date(
      center.getFullYear(),
      center.getMonth(),
      center.getDate() + offset,
    );
    const isToday = isSameDay(date, todayDay);

    return {
      date,
      weekdayInitial: WEEKDAY_INITIALS[date.getDay()],
      dayNumber: String(date.getDate()).padStart(2, '0'),
      selected: isSameDay(date, center),
      goalMet: isToday && todayGoalMet,
    };
  });
};
