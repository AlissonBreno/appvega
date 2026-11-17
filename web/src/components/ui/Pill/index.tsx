import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { Badge } from '~/components/ui/shadcn/badge';
import { cn } from '~/lib/utils';

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
      <Badge
        variant={selected ? 'default' : 'secondary'}
        render={
          <button
            type="button"
            aria-label={accessibilityLabel}
            aria-pressed={selected}
            onClick={onClick}
            style={style}
          />
        }
        className={cn(
          'h-auto cursor-pointer gap-1 rounded-full border-0 px-4 py-2 text-sm font-medium',
          selected
            ? 'bg-[var(--primary-text)] text-[var(--background)] hover:bg-[var(--primary-text)]'
            : 'bg-card text-muted-foreground hover:bg-card hover:text-muted-foreground',
          className,
        )}
      >
        {children}
      </Badge>
    </PillContext.Provider>
  );
};

type LabelProps = {
  children: ReactNode;
};

const Label = ({ children }: LabelProps) => {
  const { selected } = usePill();

  return (
    <span
      className={cn(
        'text-sm font-medium leading-[21px]',
        selected ? 'text-[var(--background)]' : 'text-muted-foreground',
      )}
    >
      {children}
    </span>
  );
};

export const Pill = {
  Root,
  Label,
};
