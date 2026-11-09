import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import IconGlyph, { type IconName } from '../Icon';

import styles from './styles.module.css';

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
    <button
      type={type}
      aria-label={accessibilityLabel}
      disabled={isDisabled}
      onClick={onClick}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </button>
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
    color={color ?? 'var(--text-muted)'}
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
  <span className={[styles.label, className].filter(Boolean).join(' ')} style={style}>
    {children}
  </span>
);

export const Button = {
  Root,
  Icon,
  Label,
};
