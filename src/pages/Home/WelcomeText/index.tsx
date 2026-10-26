import { Text, View } from 'react-native';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { welcomeTextStyles } from './styles';

const USER_NAME = 'Alisson';

const getGreeting = (date: Date) => {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return { label: 'Bom dia', emoji: '☀️' };
  }

  if (hour >= 12 && hour < 18) {
    return { label: 'Boa tarde', emoji: '⛅' };
  }

  return { label: 'Boa noite', emoji: '🌙' };
};

const WelcomeText = () => {
  const { isDark } = useNavigationTheme();
  const styles = welcomeTextStyles[isDark ? 'dark' : 'light'];
  const { label, emoji } = getGreeting(new Date());

  return (
    <View>
      <Text style={styles.title}>
        {label}, {USER_NAME} {emoji}
      </Text>
      <Text style={styles.subtitle}>Como você está hoje?</Text>
    </View>
  );
};

export default WelcomeText;
