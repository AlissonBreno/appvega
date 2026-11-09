import { useContext } from 'react';

import {
  ThemeContext,
  type ThemePreferenceValue,
} from '~/contexts/ThemeContext';

export const useThemePreference = (): ThemePreferenceValue => {
  const preference = useContext(ThemeContext);

  if (!preference) {
    throw new Error('useThemePreference deve ser usado dentro de ThemeProvider');
  }

  return preference;
};
