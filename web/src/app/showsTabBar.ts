const TAB_PATHS = new Set(['/', '/historico', '/perfil']);
const STACK_PATHS = new Set(['/buscar', '/adicionar']);

export const showsTabBar = (path: string, desktop = false) => {
  if (path === '/login') {
    return false;
  }

  if (TAB_PATHS.has(path)) {
    return true;
  }

  return desktop && STACK_PATHS.has(path);
};
