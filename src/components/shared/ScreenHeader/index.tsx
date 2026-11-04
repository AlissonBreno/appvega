import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconGlyph, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { screenHeaderStyles } from './styles';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      {children}
    </View>
  );
};

type RowProps = {
  children: ReactNode;
};

const Row = ({ children }: RowProps) => {
  const { isDark } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return <View style={styles.row}>{children}</View>;
};

type IconProps = {
  name: IconName;
};

const Icon = ({ name }: IconProps) => {
  const { theme } = useNavigationTheme();

  return <IconGlyph name={name} color={theme.colors.primary} size={24} />;
};

type BackProps = {
  onPress?: () => void;
};

const Back = ({ onPress }: BackProps) => {
  const { theme } = useNavigationTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      hitSlop={12}
      onPress={onPress}
    >
      <IconGlyph name="arrow-left" color={theme.colors.primaryText} size={24} />
    </Pressable>
  );
};

type TextColumnProps = {
  children: ReactNode;
};

const TextColumn = ({ children }: TextColumnProps) => {
  const { isDark } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return <View style={styles.textColumn}>{children}</View>;
};

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => {
  const { isDark } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return <Text style={styles.title}>{children}</Text>;
};

type SubtitleProps = {
  children: ReactNode;
};

const Subtitle = ({ children }: SubtitleProps) => {
  const { isDark } = useNavigationTheme();
  const styles = screenHeaderStyles[isDark ? 'dark' : 'light'];

  return <Text style={styles.subtitle}>{children}</Text>;
};

export const ScreenHeader = {
  Root,
  Row,
  Icon,
  Back,
  TextColumn,
  Title,
  Subtitle,
};
