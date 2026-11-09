import { useContext } from 'react';

import { UserContext, type UserContextValue } from '~/contexts/UserContext';

export const useUser = (): UserContextValue => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }

  return user;
};
