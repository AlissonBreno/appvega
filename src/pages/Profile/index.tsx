import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from '~/components/shared/ScreenHeader';
import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { Theme } from '~/types/Theme';

import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;

type GoalRowProps = {
  icon: IconName;
  label: string;
  value: string;
  unit: string;
  totalColor: string;
};

function ProfileSummary({ theme }: { theme: Theme }) {
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

function GoalRow({ icon, label, value, unit, totalColor }: GoalRowProps) {
  const { theme } = useNavigationTheme();
  const { colors, fonts } = theme;

  return (
    <View style={styles.goalRow}>
      <Icon name={icon} color={totalColor} size={18} />
      <View style={styles.goalCopy}>
        <Text style={[styles.goalLabel, fonts.medium, { color: colors.primaryText }]}>
          {label}
        </Text>
        <Text style={[styles.goalTotal, fonts.light, { color: totalColor }]}>
          {value} / {value} {unit}
        </Text>
      </View>
      <View style={[styles.stepper, { borderColor: colors.border }]}>
        <Icon name="minus" color={colors.secondaryText} size={12} />
        <Text
          style={[styles.stepperValue, fonts.light, { color: colors.primaryText }]}
        >
          {value}
        </Text>
        <Icon name="plus" color={colors.secondaryText} size={12} />
      </View>
    </View>
  );
}

function AppAbout({ theme }: { theme: Theme }) {
  const { colors, fonts } = theme;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.foreground, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.aboutTitle, fonts.medium, { color: colors.primaryText }]}>
        VEGA · Nutrição fácil
      </Text>
      <Text style={[styles.version, fonts.light, { color: colors.secondaryText }]}>
        v1.0.0 · by Alisson Goulart
      </Text>
      <Text style={[styles.aboutBody, fonts.light, { color: colors.secondaryText }]}>
        Auxilia o monitoramento nutricional e não substitui acompanhamento clínico.
      </Text>
    </View>
  );
}

function Profile() {
  const insets = useSafeAreaInsets();
  const { theme } = useNavigationTheme();
  const { colors, fonts } = theme;

  const goals: GoalRowProps[] = [
    {
      icon: 'fire',
      label: 'Calorias',
      value: '2000',
      unit: 'kcal',
      totalColor: colors.error,
    },
    {
      icon: 'bread-slice',
      label: 'Carboidratos',
      value: '250',
      unit: 'g',
      totalColor: colors.secondary,
    },
    {
      icon: 'egg',
      label: 'Proteínas',
      value: '150',
      unit: 'g',
      totalColor: colors.primary,
    },
    {
      icon: 'cheese',
      label: 'Gordura',
      value: '65',
      unit: 'g',
      totalColor: colors.fat,
    },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + TAB_CLEARANCE,
        },
      ]}
    >
      <ScreenHeader
        icon="user-cog"
        title="Perfil & metas"
        subtitle="Configure suas metas nutricionais"
      />
      <ProfileSummary theme={theme} />
      <View
        style={[
          styles.card,
          { backgroundColor: colors.foreground, borderColor: colors.border },
        ]}
      >
        <Text
          style={[styles.sectionTitle, fonts.bold, { color: colors.primaryText }]}
        >
          Metas Diárias
        </Text>
        {goals.map(goal => (
          <GoalRow key={goal.label} {...goal} />
        ))}
        <View
          style={[
            styles.idleButton,
            { borderColor: colors.border, backgroundColor: colors.background },
          ]}
        >
          <Icon name="save" color={colors.secondaryText} size={16} />
          <Text
            style={[styles.idleLabel, fonts.medium, { color: colors.secondaryText }]}
          >
            Sem alterações
          </Text>
        </View>
      </View>
      <AppAbout theme={theme} />
    </ScrollView>
  );
}

export default Profile;
