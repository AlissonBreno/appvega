import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { showsTabBar, tabItems } from '~/config/navigation';
import { DESKTOP_QUERY } from '~/config/viewport';
import { useToast } from '~/hooks/useToast';
import { getUser } from '~/modules/User/services/user';
import { FloatingTabBar } from '~/components/layout/FloatingTabBar';
import { Sidebar } from '~/components/layout/Sidebar';
import Toast from '~/components/ui/Toast';

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const location = useLocation();
  const { toast, dismissToast } = useToast();
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
            {tabItems.map(item => (
              <Sidebar.Item key={item.to} to={item.to} icon={item.icon} label={item.label} end={item.end} />
            ))}
          </Sidebar.Nav>
          <Sidebar.Footer product="Monitoramento nutricional" version="v1.0.0" />
        </Sidebar.Root>
      ) : null}
      <div className={tabbed && desktop ? 'app-column' : undefined}>{children}</div>
      {!desktop && tabbed ? <FloatingTabBar pathname={location.pathname} /> : null}
      {toast ? <Toast message={toast.message} variant={toast.variant} onDismiss={dismissToast} /> : null}
    </div>
  );
};

export default AppShell;
