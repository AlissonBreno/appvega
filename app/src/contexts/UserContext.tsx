import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getUser } from '~/modules/User/services/user';
import type { User } from '~/types';

export type UserContextValue = {
  user: User;
  refreshUser: () => void;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextValue | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

const readUser = (): User => ({ ...getUser() });

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User>(readUser);

  const refreshUser = useCallback(() => {
    setUserState(readUser());
  }, []);

  const setUser = useCallback((next: User) => {
    setUserState(next);
  }, []);

  const value = useMemo(
    () => ({
      user,
      refreshUser,
      setUser,
    }),
    [user, refreshUser, setUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
