import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';

import Icon, { type IconName } from '../../ui/Icon';

import styles from './styles.module.css';

const ACTIVE_SIZE = 72;

const tabs: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Início', icon: 'home' },
  { to: '/historico', label: 'Histórico', icon: 'chart-bar' },
  { to: '/perfil', label: 'Perfil', icon: 'user-cog' },
];

type FloatingTabBarProps = {
  pathname: string;
};

const resolveActiveIndex = (pathname: string) => {
  if (pathname.startsWith('/buscar') || pathname.startsWith('/adicionar')) {
    return 0;
  }

  const exact = tabs.findIndex(tab => tab.to === pathname);
  if (exact >= 0) {
    return exact;
  }

  return tabs.findIndex(tab => tab.to !== '/' && pathname.startsWith(tab.to));
};

export const FloatingTabBar = ({ pathname }: FloatingTabBarProps) => {
  const location = useLocation();
  const activeIndex = useMemo(
    () => Math.max(0, resolveActiveIndex(pathname || location.pathname)),
    [location.pathname, pathname],
  );
  const activeTab = tabs[activeIndex] ?? tabs[0];
  const translate = `translateX(${activeIndex * ACTIVE_SIZE}px)`;

  return (
    <nav className={[styles.host, styles.horizontal].join(' ')} aria-label="Navegação">
      <div className={styles.pill}>
        <div className={styles.track} aria-hidden />
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            aria-label={tab.label}
            className={styles.item}
          >
            <Icon name={tab.icon} size={22} color="var(--secondary-text)" />
          </NavLink>
        ))}
        <div className={styles.activeCircle} style={{ transform: translate }} aria-hidden>
          <Icon name={activeTab.icon} size={22} color="var(--foreground)" />
        </div>
      </div>
    </nav>
  );
};

export default FloatingTabBar;
