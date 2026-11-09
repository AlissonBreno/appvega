import { NavLink } from 'react-router';
import { Icon } from './Icons';

const tabs = [
  { to: '/', label: 'Home', icon: 'home' as const },
  { to: '/historico', label: 'Histórico', icon: 'chart' as const },
  { to: '/perfil', label: 'Perfil', icon: 'user' as const },
];

type FloatingTabBarProps = {
  desktop: boolean;
  pathname: string;
};

export const FloatingTabBar = ({ desktop, pathname }: FloatingTabBarProps) => (
  <nav className={desktop ? 'tab-bar tab-bar-desktop' : 'tab-bar tab-bar-mobile'} aria-label="Navegação">
    {tabs.map(tab => (
      <NavLink
        key={tab.to}
        to={tab.to}
        end={tab.to === '/'}
        aria-label={tab.label}
        className={({ isActive }) => {
          const stackKeepsHome =
            tab.to === '/' && (pathname.startsWith('/buscar') || pathname.startsWith('/adicionar'));

          return isActive || stackKeepsHome ? 'tab-link tab-link-active' : 'tab-link';
        }}
      >
        <Icon name={tab.icon} />
      </NavLink>
    ))}
  </nav>
);
