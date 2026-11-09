import type { CSSProperties, ReactNode } from 'react';

import styles from './styles.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

const Root = ({ children, className, style, 'aria-label': ariaLabel }: CardProps) => (
  <section
    className={[styles.card, className].filter(Boolean).join(' ')}
    style={style}
    aria-label={ariaLabel}
  >
    {children}
  </section>
);

type SectionTitleProps = {
  title: string;
  className?: string;
  style?: CSSProperties;
};

const SectionTitle = ({ title, className, style }: SectionTitleProps) => (
  <h2 className={[styles.sectionTitle, className].filter(Boolean).join(' ')} style={style}>
    {title}
  </h2>
);

export const Card = {
  Root,
  SectionTitle,
};
