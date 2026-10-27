import { Switch, Text, View } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useThemePreference } from '~/hooks/useThemePreference';
import { themes } from '~/styles/theme';
import { replace } from '~/utils/RootNavigation';

import { toolsStyles } from './styles';

const Tools = () => {
  const { isDark, setScheme } = useThemePreference();
  const { theme } = useNavigationTheme();
  const { colors } = theme;
  const styles = toolsStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root>
      <Card.SectionTitle title="⚙️ Ferramentas" />
      <View style={styles.row}>
        <View style={styles.iconWell}>
          <Icon
            name={isDark ? 'lightbulb-on' : 'lightbulb'}
            color={isDark ? colors.toast.warning : colors.secondaryText}
            size={18}
          />
        </View>
        <View style={styles.copy}>
          <Text style={styles.rowTitle}>Modo Escuro</Text>
          <Text style={styles.caption}>
            {isDark ? 'Tema escuro ativo' : 'Tema claro ativo'}
          </Text>
        </View>
        <Switch
          accessibilityLabel="Modo Escuro"
          value={isDark}
          onValueChange={enabled => setScheme(enabled ? 'dark' : 'light')}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={themes.light.colors.foreground}
          ios_backgroundColor={colors.border}
        />
      </View>
      <Button.Root
        tone="danger"
        accessibilityLabel="Sair da conta"
        onPress={() => replace('Login')}
      >
        <Button.Icon name="sign-out-alt" />
        <Button.Label>Sair da conta</Button.Label>
      </Button.Root>
    </Card.Root>
  );
};

export default Tools;
