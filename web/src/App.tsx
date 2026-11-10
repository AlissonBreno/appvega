import { BrowserRouter } from 'react-router';
import { SelectedDateProvider } from '~/contexts/SelectedDateContext';
import { ThemeProvider } from '~/contexts/ThemeContext';
import { ToastProvider } from '~/contexts/ToastContext';
import AppRoutes from '~/routes';

export const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ToastProvider>
        <SelectedDateProvider>
          <AppRoutes />
        </SelectedDateProvider>
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);
