import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/shadcn/collapsible';
import { cn } from '~/lib/utils';

import Icon from '../Icon';

import styles from './styles.module.css';

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
  const isControlled = expanded !== undefined && onToggle !== undefined;
  const isExpanded = isControlled ? expanded : uncontrolledExpanded;

  const toggle = useCallback(() => {
    if (isControlled) {
      onToggle();
      return;
    }

    setUncontrolledExpanded(current => !current);
  }, [isControlled, onToggle]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isControlled) {
        if (open !== expanded) {
          onToggle();
        }
        return;
      }

      setUncontrolledExpanded(open);
    },
    [expanded, isControlled, onToggle],
  );

  const value = useMemo(
    () => ({ expanded: isExpanded, toggle }),
    [isExpanded, toggle],
  );

  return (
    <CollapseContext.Provider value={value}>
      <Collapsible open={isExpanded} onOpenChange={handleOpenChange}>
        {children}
      </Collapsible>
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

  return (
    <span
      className={[styles.chevron, expanded ? styles.chevronExpanded : null]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
      data-collapse-noun={name}
    >
      <Icon name="chevron-down" size={16} color="var(--secondary-text)" />
    </span>
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
  className?: string;
  style?: CSSProperties;
};

const Trigger = ({ children, accessibilityLabel, className, style }: TriggerProps) => {
  const { expanded } = useCollapse();
  const noun = accessibilityLabel ? undefined : chevronNoun(children);
  const label =
    accessibilityLabel ??
    (noun ? collapseActionLabel(noun, expanded) : undefined);

  return (
    <CollapsibleTrigger
      type="button"
      aria-label={label}
      className={className}
      style={style}
    >
      {children}
    </CollapsibleTrigger>
  );
};

type PanelProps = {
  children: ReactNode;
};

const Panel = ({ children }: PanelProps) => (
  <CollapsibleContent className={cn('overflow-hidden')}>{children}</CollapsibleContent>
);

export const Collapse = {
  Root,
  Trigger,
  Chevron,
  Panel,
};
