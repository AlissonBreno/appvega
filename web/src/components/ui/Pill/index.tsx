import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';

import styles from './styles.module.css';

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
  onClick?: () => void;
  accessibilityLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const Root = ({
  children,
  selected = false,
  onClick,
  accessibilityLabel,
  className,
  style,
}: RootProps) => {
  const value = useMemo(() => ({ selected }), [selected]);

  return (
    <PillContext.Provider value={value}>
      <button
        type="button"
        aria-label={accessibilityLabel}
        aria-pressed={selected}
        onClick={onClick}
        className={[styles.root, selected ? styles.selected : null, className]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {children}
      </button>
    </PillContext.Provider>
  );
};

type LabelProps = {
  children: ReactNode;
};

const Label = ({ children }: LabelProps) => {
  const { selected } = usePill();

  return (
    <span className={[styles.label, selected ? styles.labelSelected : null].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

export const Pill = {
  Root,
  Label,
};
