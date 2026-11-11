import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type SelectedDateValue = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const SelectedDateContext = createContext<SelectedDateValue | null>(null);

export const SelectedDateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const value = useMemo(() => ({ selectedDate, setSelectedDate }), [selectedDate]);

  return <SelectedDateContext.Provider value={value}>{children}</SelectedDateContext.Provider>;
};

export const useSelectedDate = () => {
  const value = useContext(SelectedDateContext);

  if (!value) {
    throw new Error('useSelectedDate deve ficar dentro de SelectedDateProvider');
  }

  return value;
};
