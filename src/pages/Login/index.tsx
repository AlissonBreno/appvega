import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { StackParamList } from '~/types/Navigation';

import { loginStyles } from './styles';

const WelcomeHeading = () => {
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeTitle}>Bem-vindo ao appvega.</Text>
      <Text style={styles.welcomeSubtitle}>
        Seu assistente de rastreamento nutricional.
      </Text>
    </View>
  );
};

const EmailField = () => {
  return (
    <Input.Field>
      <Input.Label>E-mail</Input.Label>
      <Input.Content>
        <Input.Icon name="envelope" />
        <Input.TextInput
          accessibilityLabel="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="seu@email.com"
        />
      </Input.Content>
    </Input.Field>
  );
};

const PasswordField = () => {
  return (
    <Input.Field>
      <Input.Label>Senha</Input.Label>
      <Input.Content>
        <Input.Icon name="lock" />
        <Input.TextInput
          accessibilityLabel="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="••••••••"
          secureTextEntry
        />
      </Input.Content>
    </Input.Field>
  );
};

const SignInButton = () => {
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <Button.Root accessibilityLabel="Entrar" style={styles.signIn}>
      <Button.Label style={styles.signInLabel}>Entrar</Button.Label>
      <Button.Icon name="arrow-right" style={styles.signInIcon} />
    </Button.Root>
  );
};

const OrDivider = () => {
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerLabel}>ou</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const GoogleSignInButton = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <Button.Root
      accessibilityLabel="Continuar com Google"
      onPress={() => navigation.replace('Main')}
      style={styles.google}
    >
      <Button.Icon name="google" style={styles.googleIcon} />
      <Button.Label style={styles.googleLabel}>
        Continuar com Google
      </Button.Label>
    </Button.Root>
  );
};

const AlternativeSignIn = () => {
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.alternative}>
      <OrDivider />
      <GoogleSignInButton />
    </View>
  );
};

const LoginForm = () => {
  const { isDark } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={styles.form}>
      <EmailField />
      <PasswordField />
      <SignInButton />
      <AlternativeSignIn />
    </View>
  );
};

const Login = () => {
  const insets = useSafeAreaInsets();
  const { isDark, theme } = useNavigationTheme();
  const styles = loginStyles[isDark ? 'dark' : 'light'];

  return (
    <View
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <WelcomeHeading />
        <LoginForm />
      </ScrollView>
    </View>
  );
};

export default Login;
