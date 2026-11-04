import { Pressable, Text, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { CALORIES_EATEN, DAILY_GOAL_KCAL } from '../dailySummary';
import { buildWeekDays } from './weekDays';
import { weekDaySelectorStyles } from './styles';

type WeekDaySelectorProps = {
  selectedDate: Date;
  today?: Date;
  onSelectDate: (date: Date) => void;
};

const WeekDaySelector = ({
  selectedDate,
  today = new Date(),
  onSelectDate,
}: WeekDaySelectorProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = weekDaySelectorStyles[isDark ? 'dark' : 'light'];
  const days = buildWeekDays({
    selectedDate,
    today,
    caloriesEaten: CALORIES_EATEN,
    dailyGoalKcal: DAILY_GOAL_KCAL,
  });

  return (
    <View style={styles.row}>
      {days.map(day => (
        <Pressable
          key={`${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`}
          accessibilityRole="button"
          onPress={() => onSelectDate(day.date)}
          style={[styles.day, day.selected && styles.daySelected]}
        >
          <Text
            style={[styles.weekday, day.selected && styles.weekdaySelected]}
          >
            {day.weekdayInitial}
          </Text>
          {day.goalMet ? (
            <View style={styles.check}>
              <Icon name="check" size={16} color={theme.colors.primary} />
            </View>
          ) : (
            <Text
              style={[
                styles.dayNumber,
                day.selected && styles.dayNumberSelected,
              ]}
            >
              {day.dayNumber}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default WeekDaySelector;
