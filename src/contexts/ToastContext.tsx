import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ACTIVE_SIZE,
  TAB_BOTTOM_OFFSET,
} from '~/components/layout/FloatingTabBar/styles';
import Toast, { type ToastVariant } from '~/components/ui/Toast';
import { tabIcons } from '~/config/navigation';
import { navigationRef } from '~/utils/RootNavigation';

const VISIBLE_MS = 3000;

export type ShowToastInput = {
  message: string;
  variant: ToastVariant;
};

export type ToastContextValue = {
  showToast: (input: ShowToastInput) => void;
};

type ActiveToast = ShowToastInput & {
  id: number;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const hostStyles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
});

const isTabLeaf = (name: string | undefined) => {
  return name != null && Object.prototype.hasOwnProperty.call(tabIcons, name);
};

const useTabBarShown = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sync = () => {
      if (!navigationRef.isReady()) {
        return;
      }

      setShown(isTabLeaf(navigationRef.getCurrentRoute()?.name));
    };

    sync();

    const unsubscribeReady = navigationRef.addListener('ready', sync);
    const unsubscribeState = navigationRef.addListener('state', sync);

    return () => {
      unsubscribeReady();
      unsubscribeState();
    };
  }, []);

  return shown;
};

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const insets = useSafeAreaInsets();
  const hasTabBar = useTabBarShown();
  const nextId = useRef(0);
  const toastIdRef = useRef<number | null>(null);
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const [exitingId, setExitingId] = useState<number | null>(null);

  toastIdRef.current = toast?.id ?? null;

  const showToast = useCallback((input: ShowToastInput) => {
    nextId.current += 1;
    setExitingId(null);
    setToast({ ...input, id: nextId.current });
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const id = toast.id;
    const timeout = setTimeout(() => {
      if (toastIdRef.current === id) {
        setExitingId(id);
      }
    }, VISIBLE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  const hide = useCallback((id: number) => {
    setToast(current => (current?.id === id ? null : current));
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);
  const bottom = hasTabBar
    ? insets.bottom + TAB_BOTTOM_OFFSET + ACTIVE_SIZE
    : insets.bottom;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View pointerEvents="box-none" style={[hostStyles.host, { bottom }]}>
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            exiting={exitingId === toast.id}
            onDismiss={() => setExitingId(toast.id)}
            onHidden={() => hide(toast.id)}
          />
        </View>
      ) : null}
    </ToastContext.Provider>
  );
};
