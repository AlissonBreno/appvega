import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { Button as ShadcnButton } from '~/components/ui/shadcn/button';
import { cn } from '~/lib/utils';

import IconGlyph, { type IconName } from '../Icon';

type RootProps = {
  children: ReactNode;
  onClick?: () => void;
  accessibilityLabel?: string;
  className?: string;
  style?: CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
};

const Root = ({
  children,
  onClick,
  accessibilityLabel,
  className,
  style,
  type = 'button',
  disabled,
}: RootProps) => {
  const isDisabled = disabled ?? !onClick;

  return (
    <ShadcnButton
      type={type}
      aria-label={accessibilityLabel}
      disabled={isDisabled}
      onClick={onClick}
      variant="outline"
      size="lg"
      className={cn(
        'h-[60px] min-h-[60px] w-auto gap-2 rounded-xl border-border bg-background px-4 text-base font-medium text-muted-foreground opacity-55 hover:bg-background hover:text-muted-foreground dark:border-border dark:bg-background dark:hover:bg-background',
        className,
      )}
      style={style}
    >
      {children}
    </ShadcnButton>
  );
};

type IconProps = {
  name: IconName;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

const Icon = ({ name, color, className, style }: IconProps) => (
  <IconGlyph
    name={name}
    size={16}
    color={color ?? 'var(--secondary-text)'}
    className={className}
    style={style}
  />
);

type LabelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Label = ({ children, className, style }: LabelProps) => (
  <span
    className={cn('text-base font-medium leading-[21px] text-muted-foreground', className)}
    style={style}
  >
    {children}
  </span>
);

export const Button = {
  Root,
  Icon,
  Label,
};
