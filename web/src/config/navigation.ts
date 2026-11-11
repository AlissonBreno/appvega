import type { IconName } from '~/components/ui/Icon';
import { routes, stackPaths, tabPaths } from '~/types/Navigation';

export const tabItems: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: routes.home, label: 'Início', icon: 'home', end: true },
  { to: routes.history, label: 'Histórico', icon: 'chart-bar' },
  { to: routes.profile, label: 'Perfil', icon: 'user-cog' },
];

const tabPathSet = new Set<string>(tabPaths);
const stackPathSet = new Set<string>(stackPaths);

export const showsTabBar = (path: string, desktop = false) => {
  if (path === routes.login) {
    return false;
  }

  if (tabPathSet.has(path)) {
    return true;
  }

  return desktop && stackPathSet.has(path);
};
