import type { CSSProperties, ReactNode } from 'react';

import { Card as ShadcnCard } from '~/components/ui/shadcn/card';
import { cn } from '~/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};

const Root = ({ children, className, style, 'aria-label': ariaLabel }: CardProps) => (
  <ShadcnCard
    className={cn(
      'gap-4 rounded-[20px] bg-card p-6 py-6 text-card-foreground ring-0 [--card-spacing:0px]',
      className,
    )}
    style={style}
    aria-label={ariaLabel}
  >
    {children}
  </ShadcnCard>
);

type SectionTitleProps = {
  title: string;
  className?: string;
  style?: CSSProperties;
};

const SectionTitle = ({ title, className, style }: SectionTitleProps) => (
  <h2
    className={cn(
      'm-0 text-2xl font-bold leading-[21px] text-[var(--primary-text)]',
      className,
    )}
    style={style}
  >
    {title}
  </h2>
);

export const Card = {
  Root,
  SectionTitle,
};
