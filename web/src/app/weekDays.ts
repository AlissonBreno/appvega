const INITIALS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const;

export type WeekDay = {
  date: Date;
  initial: string;
  label: string;
};

export const weekDaysAround = (selected: Date): WeekDay[] =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate() - 3 + index,
    );

    return {
      date,
      initial: INITIALS[date.getDay()],
      label: String(date.getDate()).padStart(2, '0'),
    };
  });
