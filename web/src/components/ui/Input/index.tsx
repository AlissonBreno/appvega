import type {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

import { Input as ShadcnInput } from '~/components/ui/shadcn/input';
import { cn } from '~/lib/utils';

import IconGlyph, { type IconName } from '../Icon';

import styles from './styles.module.css';

type FieldProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Field = ({ children, className, style }: FieldProps) => (
  <label className={[styles.field, className].filter(Boolean).join(' ')} style={style}>
    {children}
  </label>
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

type ContentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Content = ({ children, className, style }: ContentProps) => (
  <span className={[styles.content, className].filter(Boolean).join(' ')} style={style}>
    {children}
  </span>
);

type IconProps = {
  name: IconName;
  className?: string;
  style?: CSSProperties;
};

const Icon = ({ name, className, style }: IconProps) => (
  <IconGlyph
    name={name}
    size={16}
    color="var(--secondary-text)"
    className={className}
    style={style}
  />
);

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const TextInput = ({ className, ...props }: TextInputProps) => (
  <ShadcnInput
    {...props}
    className={cn(
      'h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-3.5 text-base font-normal text-[var(--primary-text)] shadow-none outline-none placeholder:text-muted-foreground focus-visible:border-0 focus-visible:ring-0 disabled:bg-transparent dark:bg-transparent dark:disabled:bg-transparent md:text-base',
      className,
    )}
  />
);

export const Input = {
  Field,
  Label,
  Content,
  Icon,
  TextInput,
};
