import { isSameDay } from '~/utils/date';
import { weekDaysAround } from './weekDays';

const CALORIES_EATEN = 1108;
const DAILY_GOAL_KCAL = 2600;

type WeekDaySelectorProps = {
  selectedDate: Date;
  today: Date;
  onSelect: (date: Date) => void;
};

const WeekDaySelector = ({ selectedDate, today, onSelect }: WeekDaySelectorProps) => (
  <div className="week">
    {weekDaysAround(selectedDate).map(day => {
      const selected = isSameDay(day.date, selectedDate);
      const isToday = isSameDay(day.date, today);

      return (
        <button
          key={day.date.toISOString()}
          type="button"
          aria-pressed={selected}
          onClick={() => onSelect(day.date)}
        >
          <small>{day.initial}</small>
          <strong>{day.label}</strong>
          {isToday && CALORIES_EATEN >= DAILY_GOAL_KCAL ? <small>✓</small> : null}
        </button>
      );
    })}
  </div>
);

export default WeekDaySelector;
