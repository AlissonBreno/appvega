import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ToastVariant } from '~/components/ui/Toast';

type Toast = { id: number; message: string; variant: ToastVariant };

type ShowToastInput = {
  message: string;
  variant: ToastVariant;
};

type ToastValue = {
  toast: Toast | null;
  showToast: (input: ShowToastInput) => void;
  dismissToast: () => void;
};

const ToastContext = createContext<ToastValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const value = useMemo(
    () => ({
      toast,
      showToast: (input: ShowToastInput) =>
        setToast({ id: Date.now(), message: input.message, variant: input.variant }),
      dismissToast: () => setToast(null),
    }),
    [toast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const value = useContext(ToastContext);

  if (!value) {
    throw new Error('useToast deve ficar dentro de ToastProvider');
  }

  return value;
};
