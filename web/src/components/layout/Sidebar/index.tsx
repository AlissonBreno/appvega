import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';

import { routes } from '~/types/Navigation';
import Icon, { type IconName } from '~/components/ui/Icon';

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
      <p className={styles.greeting}>Olá,</p>
      <p className={styles.name}>{name}</p>
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
  pathname.startsWith(routes.searchFood) || pathname.startsWith(routes.addFood);

const Item = ({ to, icon, label, end }: ItemProps) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => {
        const active = isActive || (to === routes.home && isStackUnderHome(pathname));
        return [styles.item, active ? styles.itemActive : null].filter(Boolean).join(' ');
      }}
    >
      {({ isActive }) => {
        const active = isActive || (to === routes.home && isStackUnderHome(pathname));
        return (
          <>
            <span
              className={[styles.itemIcon, active ? styles.itemIconActive : null]
                .filter(Boolean)
                .join(' ')}
            >
              <Icon
                name={icon}
                size={18}
                color={active ? 'var(--foreground)' : 'var(--secondary-text)'}
              />
            </span>
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
