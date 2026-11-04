import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MealsProvider } from '~/modules/Meal/contexts/MealsContext';
import { ThemeProvider } from '~/contexts/ThemeContext';
import { ToastProvider } from '~/contexts/ToastContext';
import { useThemePreference } from '~/hooks/useThemePreference';
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
            <MealsProvider>
              <ThemedStatusBar />
              <Routes />
            </MealsProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
