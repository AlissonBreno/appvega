import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ToastVariant } from '../components/ui/Toast';
import { applyScheme, resolveInitialScheme } from '../theme/scheme';
import type { Scheme } from '../theme/tokens';

type Toast = { id: number; message: string; variant: ToastVariant };

type ShowToastInput = {
  message: string;
  variant: ToastVariant;
};

type SessionValue = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  scheme: Scheme;
  setScheme: (scheme: Scheme) => void;
  toast: Toast | null;
  showToast: (input: ShowToastInput) => void;
  dismissToast: () => void;
};

const SessionContext = createContext<SessionValue | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [scheme, setSchemeState] = useState<Scheme>(() =>
    resolveInitialScheme(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false),
  );
  const [toast, setToast] = useState<Toast | null>(null);

  const setScheme = (next: Scheme) => {
    setSchemeState(next);
    applyScheme(next, document.documentElement);
  };

  const value = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      scheme,
      setScheme,
      toast,
      showToast: (input: ShowToastInput) =>
        setToast({ id: Date.now(), message: input.message, variant: input.variant }),
      dismissToast: () => setToast(null),
    }),
    [selectedDate, scheme, toast],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const value = useContext(SessionContext);

  if (!value) {
    throw new Error('useSession deve ficar dentro de SessionProvider');
  }

  return value;
};
