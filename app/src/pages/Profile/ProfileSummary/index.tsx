import { Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { User } from '~/types';

import { profileSummaryStyles } from './styles';

type ProfileSummaryProps = {
  user: User;
};

const ProfileSummary = ({ user }: ProfileSummaryProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = profileSummaryStyles[isDark ? 'dark' : 'light'];

  const stats = [
    {
      value: String(user.goal_kcal),
      label: 'meta kcal',
      color: theme.colors.secondary,
    },
    { value: String(user.age), label: 'idade', color: theme.colors.primaryText },
    { value: `${user.weight}kg`, label: 'kilos', color: theme.colors.primary },
  ];

  return (
    <Card.Root>
      <View style={styles.identity}>
        <View style={styles.avatarGlow}>
          <View style={styles.avatar}>
            <View style={styles.avatarShine}>
              <Icon name="sparkles" color={theme.colors.primaryText} size={28} />
            </View>
          </View>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>Rastreando há 7 dias 🔥</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.stat}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.caption}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </Card.Root>
  );
};

export default ProfileSummary;
