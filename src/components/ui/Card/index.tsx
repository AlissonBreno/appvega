import type { ReactNode } from 'react';
import { Text, View, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { cardStyles } from './styles';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Root = ({ children, style }: CardProps) => {
  const { isDark } = useNavigationTheme();
  const styles = cardStyles[isDark ? 'dark' : 'light'];

  return <View style={[styles.card, style]}>{children}</View>;
};

type SectionTitleProps = {
  title: string;
  style?: StyleProp<TextStyle>;
};

const SectionTitle = ({ title, style }: SectionTitleProps) => {
  const { isDark } = useNavigationTheme();
  const styles = cardStyles[isDark ? 'dark' : 'light'];

  return <Text style={[styles.sectionTitle, style]}>{title}</Text>;
};

export const Card = {
  Root,
  SectionTitle,
};
