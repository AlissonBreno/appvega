import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';

import Icon, { type IconName } from '../../ui/Icon';

import styles from './styles.module.css';

type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps) => (
  <aside className={styles.root} aria-label="Navegação">
    {children}
  </aside>
);

type IdentityProps = {
  name: string;
};

const Identity = ({ name }: IdentityProps) => (
  <div className={styles.identity}>
    <div className={styles.avatar} aria-hidden>
      <Icon name="user-cog" size={22} color="var(--primary-text)" />
    </div>
    <div>
      <p className={styles.greeting}>Olá,</p>
      <p className={styles.name}>{name}</p>
    </div>
  </div>
);

type NavProps = {
  children: ReactNode;
};

const Nav = ({ children }: NavProps) => <nav className={styles.nav}>{children}</nav>;

type ItemProps = {
  to: string;
  icon: IconName;
  label: string;
  end?: boolean;
};

const isStackUnderHome = (pathname: string) =>
  pathname.startsWith('/buscar') || pathname.startsWith('/adicionar');

const Item = ({ to, icon, label, end }: ItemProps) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => {
        const active = isActive || (to === '/' && isStackUnderHome(pathname));
        return [styles.item, active ? styles.itemActive : null].filter(Boolean).join(' ');
      }}
    >
      {({ isActive }) => {
        const active = isActive || (to === '/' && isStackUnderHome(pathname));
        return (
          <>
            <Icon
              name={icon}
              size={20}
              color={active ? 'var(--primary-text)' : 'var(--secondary-text)'}
            />
            <span className={styles.itemLabel}>{label}</span>
          </>
        );
      }}
    </NavLink>
  );
};

type FooterProps = {
  product: string;
  version: string;
};

const Footer = ({ product, version }: FooterProps) => (
  <div className={styles.footer}>
    <p className={styles.product}>{product}</p>
    <p className={styles.version}>{version}</p>
  </div>
);

export const Sidebar = {
  Root,
  Identity,
  Nav,
  Item,
  Footer,
};
