import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { pillStyles } from './styles';

type PillContextValue = {
  selected: boolean;
};

const PillContext = createContext<PillContextValue | null>(null);

const usePill = () => {
  const value = useContext(PillContext);

  if (!value) {
    throw new Error('Pill deve ser usado dentro de Pill.Root');
  }

  return value;
};

type RootProps = {
  children: ReactNode;
  selected?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const Root = ({
  children,
  selected = false,
  onPress,
  accessibilityLabel,
  style,
}: RootProps) => {
  const { isDark } = useNavigationTheme();
  const styles = pillStyles[isDark ? 'dark' : 'light'];
  const value = useMemo(() => ({ selected }), [selected]);

  return (
    <PillContext.Provider value={value}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected }}
        onPress={onPress}
        style={[styles.root, selected ? styles.selected : null, style]}
      >
        {children}
      </Pressable>
    </PillContext.Provider>
  );
};

type LabelProps = {
  children: ReactNode;
};

const Label = ({ children }: LabelProps) => {
  const { selected } = usePill();
  const { isDark } = useNavigationTheme();
  const styles = pillStyles[isDark ? 'dark' : 'light'];

  return (
    <Text style={[styles.label, selected ? styles.labelSelected : null]}>
      {children}
    </Text>
  );
};

export const Pill = {
  Root,
  Label,
};
