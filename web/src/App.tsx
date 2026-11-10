import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { SessionProvider, useSession } from './app/session';
import { showsTabBar } from './app/showsTabBar';
import { FloatingTabBar } from './components/layout/FloatingTabBar';
import { Sidebar } from './components/layout/Sidebar';
import Toast from './components/ui/Toast';
import { getUser } from './dados/user';
import { AddPage } from './pages/AddPage';
import { HistoryPage } from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchPage } from './pages/SearchPage';

const DESKTOP_QUERY = '(min-width: 1024px)';

const Shell = () => {
  const location = useLocation();
  const { toast, dismissToast } = useSession();
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const tabbed = showsTabBar(location.pathname, desktop);
  const user = getUser();

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(dismissToast, 3000);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className={['app-shell', desktop && tabbed ? 'app-shellDesktop' : null].filter(Boolean).join(' ')}>
      {desktop && tabbed ? (
        <Sidebar.Root>
          <Sidebar.Identity name={user.name} />
          <Sidebar.Nav>
            <Sidebar.Item to="/" icon="home" label="Início" end />
            <Sidebar.Item to="/historico" icon="chart-bar" label="Histórico" />
            <Sidebar.Item to="/perfil" icon="user-cog" label="Perfil" />
          </Sidebar.Nav>
          <Sidebar.Footer product="Monitoramento nutricional" version="v1.0.0" />
        </Sidebar.Root>
      ) : null}
      <div className={tabbed && desktop ? 'app-column' : undefined}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historico" element={<HistoryPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/adicionar" element={<AddPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      {!desktop && tabbed ? <FloatingTabBar pathname={location.pathname} /> : null}
      {toast ? (
        <Toast message={toast.message} variant={toast.variant} onDismiss={dismissToast} />
      ) : null}
    </div>
  );
};

export const App = () => (
  <BrowserRouter>
    <SessionProvider>
      <Shell />
    </SessionProvider>
  </BrowserRouter>
);
