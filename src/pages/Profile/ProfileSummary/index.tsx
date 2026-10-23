import { Text, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import type { Theme } from '~/types/Theme';

import { styles } from './styles';

type ProfileSummaryProps = {
  theme: Theme;
};

function ProfileSummary({ theme }: ProfileSummaryProps) {
  const { colors, fonts } = theme;
  const stats = [
    { value: '2500', label: 'meta kcal' },
    { value: '26', label: 'idade' },
    { value: '75kg', label: 'kilos' },
  ];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.foreground, borderColor: colors.border },
      ]}
    >
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <View style={[styles.avatarBand, { backgroundColor: colors.avatarStart }]} />
          <View style={[styles.avatarBand, { backgroundColor: colors.avatarEnd }]} />
          <View style={styles.avatarShine}>
            <Icon name="sparkles" color={colors.primaryText} size={14} />
          </View>
        </View>
        <View style={styles.identityCopy}>
          <Text style={[styles.name, fonts.medium, { color: colors.primaryText }]}>
            Alisson Goulart
          </Text>
          <Text
            style={[styles.subtitle, fonts.light, { color: colors.secondaryText }]}
          >
            Rastreando há 7 dias
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        {stats.map(stat => (
          <View
            key={stat.label}
            style={[styles.stat, { borderColor: colors.border }]}
          >
            <Text
              style={[styles.statValue, fonts.bold, { color: colors.primaryText }]}
            >
              {stat.value}
            </Text>
            <Text
              style={[styles.caption, fonts.medium, { color: colors.secondaryText }]}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ProfileSummary;
