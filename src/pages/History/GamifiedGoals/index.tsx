import { Text, View } from 'react-native';

import { Card } from '~/components/ui/Card';
import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { gamifiedGoalsStyles } from './styles';

type GamifiedItemProps = {
  iconName: IconName;
  iconColor: string;
  valueText: string;
  valueLabel: string;
  captionText: string;
};

const GamifiedItem = ({
  iconName,
  iconColor,
  valueText,
  valueLabel,
  captionText,
}: GamifiedItemProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = gamifiedGoalsStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root style={styles.card}>
      <View style={styles.iconBadge}>
        <Icon name={iconName} color={iconColor} size={18} />
      </View>
      <View style={styles.valueGroup}>
        <Text style={styles.value}>{valueText}</Text>
        <Text style={styles.unit}>{valueLabel}</Text>
      </View>
      <Text style={styles.caption}>{captionText}</Text>
    </Card.Root>
  );
};

const GamifiedGoals = () => {
  const { isDark, theme } = useNavigationTheme();
  const styles = gamifiedGoalsStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.row}>
      <GamifiedItem
        iconName="fire"
        iconColor={theme.colors.error}
        valueText="1.822"
        valueLabel="kcal"
        captionText="Média diária"
      />
      <GamifiedItem
        iconName="award"
        iconColor={theme.colors.primary}
        valueText="5/7"
        valueLabel="dias"
        captionText="Dias cumpridos"
      />
      <GamifiedItem
        iconName="analytics"
        iconColor={theme.colors.secondary}
        valueText="5"
        valueLabel="dias 🔥"
        captionText="Sequência"
      />
    </View>
  );
};

export default GamifiedGoals;
