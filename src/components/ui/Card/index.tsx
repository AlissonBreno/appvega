import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { cardStyles } from './styles';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function Card({ children, style }: CardProps) {
  const { isDark } = useNavigationTheme();
  const styles = cardStyles[isDark ? 'dark' : 'light'];

  return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;
