import type { ReactNode } from 'react';

import IconGlyph, { type IconName } from '../../ui/Icon';

import styles from './styles.module.css';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => (
  <header className={styles.header}>{children}</header>
);

type RowProps = {
  children: ReactNode;
};

const Row = ({ children }: RowProps) => <div className={styles.row}>{children}</div>;

type IconProps = {
  name: IconName;
};

const Icon = ({ name }: IconProps) => (
  <span className={styles.icon}>
    <IconGlyph name={name} color="var(--primary)" size={32} />
  </span>
);

type BackProps = {
  onClick?: () => void;
  className?: string;
  iconSize?: number;
  accessibilityLabel?: string;
};

type CloseProps = {
  onClick: () => void;
  className?: string;
  iconSize?: number;
  accessibilityLabel?: string;
};

const Close = ({
  onClick,
  className,
  iconSize = 24,
  accessibilityLabel = 'Fechar',
}: CloseProps) => (
  <button
    type="button"
    aria-label={accessibilityLabel}
    onClick={onClick}
    className={[styles.close, className].filter(Boolean).join(' ')}
  >
    <IconGlyph name="x" color="var(--primary-text)" size={iconSize} />
  </button>
);

const Back = ({
  onClick,
  className,
  iconSize = 24,
  accessibilityLabel = 'Voltar',
}: BackProps) => (
  <button
    type="button"
    aria-label={accessibilityLabel}
    disabled={!onClick}
    onClick={onClick}
    className={[styles.back, className].filter(Boolean).join(' ')}
  >
    <IconGlyph name="arrow-left" color="var(--primary-text)" size={iconSize} />
  </button>
);

type TextColumnProps = {
  children: ReactNode;
  className?: string;
};

const TextColumn = ({ children, className }: TextColumnProps) => (
  <div className={[styles.textColumn, className].filter(Boolean).join(' ')}>{children}</div>
);

type TitleProps = {
  children: ReactNode;
};

const Title = ({ children }: TitleProps) => (
  <h1 className={styles.title}>{children}</h1>
);

type SubtitleProps = {
  children: ReactNode;
};

const Subtitle = ({ children }: SubtitleProps) => (
  <p className={styles.subtitle}>{children}</p>
);

export const ScreenHeader = {
  Root,
  Row,
  Icon,
  Back,
  Close,
  TextColumn,
  Title,
  Subtitle,
};
