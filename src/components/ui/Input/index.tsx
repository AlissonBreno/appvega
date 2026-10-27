import type { ReactNode } from 'react';
import {
  Text,
  TextInput as RNTextInput,
  View,
  type StyleProp,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import IconGlyph, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { inputStyles } from './styles';

type FieldProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Field = ({ children, style }: FieldProps) => {
  const { isDark } = useNavigationTheme();
  const styles = inputStyles[isDark ? 'dark' : 'light'];

  return <View style={[styles.field, style]}>{children}</View>;
};

type LabelProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const Label = ({ children, style }: LabelProps) => {
  const { isDark } = useNavigationTheme();
  const styles = inputStyles[isDark ? 'dark' : 'light'];

  return <Text style={[styles.label, style]}>{children}</Text>;
};

type ContentProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Content = ({ children, style }: ContentProps) => {
  const { isDark } = useNavigationTheme();
  const styles = inputStyles[isDark ? 'dark' : 'light'];

  return <View style={[styles.content, style]}>{children}</View>;
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

const TextInput = ({ style, ...props }: RNTextInputProps) => {
  const { isDark, theme } = useNavigationTheme();
  const styles = inputStyles[isDark ? 'dark' : 'light'];

  return (
    <RNTextInput
      {...props}
      placeholderTextColor={theme.colors.secondaryText}
      style={[styles.input, style]}
    />
  );
};

export const Input = {
  Field,
  Label,
  Content,
  Icon,
  TextInput,
};
