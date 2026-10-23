import { Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { gamifiedGoalsStyles } from './styles';

const GamifiedGoals = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = gamifiedGoalsStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.row}>
      <Card.Root style={styles.card}>
        <View style={styles.iconBadge}>
          <Icon name="fire" color={theme.colors.error} size={18} />
        </View>
        <View style={styles.valueGroup}>
          <Text style={styles.value}>1.822</Text>
          <Text style={styles.unit}>kcal</Text>
        </View>
        <Text style={styles.caption}>Média diária</Text>
      </Card.Root>
      <Card.Root style={styles.card}>{null}</Card.Root>
      <Card.Root style={styles.card}>{null}</Card.Root>
    </View>
  );
};

export default GamifiedGoals;
