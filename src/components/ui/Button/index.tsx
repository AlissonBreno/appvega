import type { ReactNode } from 'react';
import {
  Pressable,
  Text as RNText,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import IconGlyph, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { buttonStyles } from './styles';

type RootProps = {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const Root = ({ children, onPress, accessibilityLabel, style }: RootProps) => {
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !onPress }}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.root, style]}
    >
      {children}
    </Pressable>
  );
};

type IconProps = {
  name: IconName;
  style?: StyleProp<TextStyle>;
};

const Icon = ({ name, style }: IconProps) => {
  const { theme } = useNavigationTheme();

  return (
    <IconGlyph
      name={name}
      size={16}
      color={theme.colors.secondaryText}
      style={style}
    />
  );
};

type LabelProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const Label = ({ children, style }: LabelProps) => {
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return <RNText style={[styles.label, style]}>{children}</RNText>;
};

export const Button = {
  Root,
  Icon,
  Label,
};
