import { BrowserRouter } from 'react-router';
import { MealBatchProvider } from '~/contexts/MealBatchContext';
import { MealsDataProvider } from '~/contexts/MealsDataContext';
import { SelectedDateProvider } from '~/contexts/SelectedDateContext';
import { ThemeProvider } from '~/contexts/ThemeContext';
import { ToastProvider } from '~/contexts/ToastContext';
import AppRoutes from '~/routes';

export const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ToastProvider>
        <SelectedDateProvider>
          <MealsDataProvider>
            <MealBatchProvider>
              <AppRoutes />
            </MealBatchProvider>
          </MealsDataProvider>
        </SelectedDateProvider>
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);
