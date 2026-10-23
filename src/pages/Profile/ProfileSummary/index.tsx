import { Text, View } from 'react-native';

import Card from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { profileSummaryStyles } from './styles';

function ProfileSummary() {
  const { isDark, theme } = useNavigationTheme();
  const styles = profileSummaryStyles[isDark ? 'dark' : 'light'];
  const stats = [
    { value: '2500', label: 'meta kcal' },
    { value: '26', label: 'idade' },
    { value: '75kg', label: 'kilos' },
  ];

  return (
    <Card>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <View style={[styles.avatarBand, styles.avatarBandStart]} />
          <View style={[styles.avatarBand, styles.avatarBandEnd]} />
          <View style={styles.avatarShine}>
            <Icon name="sparkles" color={theme.colors.primaryText} size={14} />
          </View>
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.name}>Alisson Goulart</Text>
          <Text style={styles.subtitle}>Rastreando há 7 dias</Text>
        </View>
      </View>
      <View style={styles.stats}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.caption}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

export default ProfileSummary;
