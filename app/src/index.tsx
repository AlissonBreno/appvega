import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '~/contexts/ThemeContext';
import { ToastProvider } from '~/contexts/ToastContext';
import { UserProvider } from '~/contexts/UserContext';
import { useThemePreference } from '~/hooks/useThemePreference';
import { MealBatchProvider } from '~/modules/Meal/contexts/MealBatchContext';
import { MealsProvider } from '~/modules/Meal/contexts/MealsContext';
import Routes from '~/routes';

const ThemedStatusBar = () => {
  const { isDark } = useThemePreference();

  return <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />;
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <UserProvider>
              <MealsProvider>
                <MealBatchProvider>
                  <ThemedStatusBar />
                  <Routes />
                </MealBatchProvider>
              </MealsProvider>
            </UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
