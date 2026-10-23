import type { ReactNode } from 'react';
import { Text as RNText, View, type StyleProp, type ViewStyle } from 'react-native';

import IconGlyph, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { buttonStyles } from './styles';

type RootProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Root = ({ children, style }: RootProps) => {
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return <View style={[styles.root, style]}>{children}</View>;
};

type IconProps = {
  name: IconName;
};

const Icon = ({ name }: IconProps) => {
  const { theme } = useNavigationTheme();

  return (
    <IconGlyph name={name} size={16} color={theme.colors.secondaryText} />
  );
};

type TextProps = {
  children: ReactNode;
};

const Text = ({ children }: TextProps) => {
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return <RNText style={styles.label}>{children}</RNText>;
};

export const Button = {
  Root,
  Icon,
  Text,
};
