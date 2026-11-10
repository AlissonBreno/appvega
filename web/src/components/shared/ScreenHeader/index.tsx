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
};

const Back = ({ onClick }: BackProps) => (
  <button
    type="button"
    aria-label="Voltar"
    disabled={!onClick}
    onClick={onClick}
    className={styles.back}
  >
    <IconGlyph name="arrow-left" color="var(--primary-text)" size={24} />
  </button>
);

type TextColumnProps = {
  children: ReactNode;
};

const TextColumn = ({ children }: TextColumnProps) => (
  <div className={styles.textColumn}>{children}</div>
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
  TextColumn,
  Title,
  Subtitle,
};
