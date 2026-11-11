import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type MealsDataValue = {
  revision: number;
  markMealsChanged: () => void;
};

const MealsDataContext = createContext<MealsDataValue | null>(null);

export const MealsDataProvider = ({ children }: { children: ReactNode }) => {
  const [revision, setRevision] = useState(0);
  const value = useMemo(
    () => ({
      revision,
      markMealsChanged: () => setRevision(current => current + 1),
    }),
    [revision],
  );

  return <MealsDataContext.Provider value={value}>{children}</MealsDataContext.Provider>;
};

export const useMealsData = () => {
  const value = useContext(MealsDataContext);

  if (!value) {
    throw new Error('useMealsData deve ficar dentro de MealsDataProvider');
  }

  return value;
};
