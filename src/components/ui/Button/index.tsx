import { createContext, useContext, type ReactNode } from 'react';
import {
  Pressable,
  Text as RNText,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import IconGlyph, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { buttonStyles } from './styles';

type ButtonTone = 'muted' | 'danger';

type ButtonContextValue = {
  tone: ButtonTone;
};

const ButtonContext = createContext<ButtonContextValue>({ tone: 'muted' });

type RootProps = {
  children: ReactNode;
  onPress?: () => void;
  tone?: ButtonTone;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const Root = ({
  children,
  onPress,
  tone = 'muted',
  accessibilityLabel,
  style,
}: RootProps) => {
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return (
    <ButtonContext.Provider value={{ tone }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: !onPress }}
        disabled={!onPress}
        onPress={onPress}
        style={[styles.root, styles[tone], style]}
      >
        {children}
      </Pressable>
    </ButtonContext.Provider>
  );
};

type IconProps = {
  name: IconName;
};

const Icon = ({ name }: IconProps) => {
  const { tone } = useContext(ButtonContext);
  const { theme } = useNavigationTheme();
  const color =
    tone === 'danger' ? theme.colors.error : theme.colors.secondaryText;

  return <IconGlyph name={name} size={16} color={color} />;
};

type LabelProps = {
  children: ReactNode;
};

const Label = ({ children }: LabelProps) => {
  const { tone } = useContext(ButtonContext);
  const { isDark } = useNavigationTheme();
  const styles = buttonStyles[isDark ? 'dark' : 'light'];

  return (
    <RNText style={[styles.label, styles[tone === 'danger' ? 'labelDanger' : 'labelMuted']]}>
      {children}
    </RNText>
  );
};

export const Button = {
  Root,
  Icon,
  Label,
};
