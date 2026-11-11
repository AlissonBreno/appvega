import type {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

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
  <input {...props} className={[styles.input, className].filter(Boolean).join(' ')} />
);

export const Input = {
  Field,
  Label,
  Content,
  Icon,
  TextInput,
};
