import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import Icon from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { collapseStyles } from './styles';

type CollapseContextValue = {
  expanded: boolean;
  toggle: () => void;
};

const CollapseContext = createContext<CollapseContextValue | null>(null);

const useCollapse = () => {
  const value = useContext(CollapseContext);

  if (!value) {
    throw new Error('Collapse deve ser usado dentro de Collapse.Root');
  }

  return value;
};

type RootProps = {
  children: ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
};

const Root = ({ children, expanded, onToggle }: RootProps) => {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);
  const isExpanded =
    expanded !== undefined && onToggle !== undefined
      ? expanded
      : uncontrolledExpanded;

  const toggle = useCallback(() => {
    if (expanded !== undefined && onToggle) {
      onToggle();
      return;
    }

    setUncontrolledExpanded(current => !current);
  }, [expanded, onToggle]);

  const value = useMemo(
    () => ({ expanded: isExpanded, toggle }),
    [isExpanded, toggle],
  );

  return (
    <CollapseContext.Provider value={value}>
      {children}
    </CollapseContext.Provider>
  );
};

type ChevronProps = {
  name: string;
};

const collapseActionLabel = (name: string, expanded: boolean) =>
  `${expanded ? 'Recolher' : 'Expandir'} ${name}`;

const Chevron = ({ name }: ChevronProps) => {
  const { expanded } = useCollapse();
  const { theme } = useNavigationTheme();

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      accessibilityLabel={collapseActionLabel(name, expanded)}
    >
      <Icon
        name="chevron-down"
        size={16}
        color={theme.colors.secondaryText}
        style={expanded ? collapseStyles.chevronExpanded : undefined}
      />
    </View>
  );
};

const chevronNoun = (children: ReactNode) => {
  let noun: string | undefined;

  Children.forEach(children, child => {
    if (isValidElement<ChevronProps>(child) && child.type === Chevron) {
      noun = child.props.name;
    }
  });

  return noun;
};

type TriggerProps = {
  children: ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const Trigger = ({ children, accessibilityLabel, style }: TriggerProps) => {
  const { expanded, toggle } = useCollapse();
  const noun = accessibilityLabel ? undefined : chevronNoun(children);
  const label =
    accessibilityLabel ??
    (noun ? collapseActionLabel(noun, expanded) : undefined);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ expanded }}
      onPress={toggle}
      style={style}
    >
      {children}
    </Pressable>
  );
};

type PanelProps = {
  children: ReactNode;
};

const Panel = ({ children }: PanelProps) => {
  const { expanded } = useCollapse();

  if (!expanded) {
    return null;
  }

  return children;
};

export const Collapse = {
  Root,
  Trigger,
  Chevron,
  Panel,
};
