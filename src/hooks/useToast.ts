import { useContext } from 'react';

import { ToastContext, type ToastContextValue } from '~/contexts/ToastContext';

export const useToast = (): ToastContextValue => {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }

  return toast;
};
