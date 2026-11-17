import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { toast as sonnerToast } from 'sonner';

import { ToastToaster, type ToastVariant } from '~/components/ui/Toast';

type ShowToastInput = {
  message: string;
  variant: ToastVariant;
};

type ToastValue = {
  showToast: (input: ShowToastInput) => void;
  dismissToast: () => void;
};

const ToastContext = createContext<ToastValue | null>(null);

const showByVariant = (message: string, variant: ToastVariant) => {
  const options = { duration: 3000 };

  if (variant === 'success') {
    sonnerToast.success(message, options);
    return;
  }

  if (variant === 'danger') {
    sonnerToast.error(message, options);
    return;
  }

  sonnerToast.warning(message, options);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      showToast: (input: ShowToastInput) => showByVariant(input.message, input.variant),
      dismissToast: () => sonnerToast.dismiss(),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastToaster />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const value = useContext(ToastContext);

  if (!value) {
    throw new Error('useToast deve ficar dentro de ToastProvider');
  }

  return value;
};
