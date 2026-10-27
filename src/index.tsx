import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '~/contexts/ThemeContext';
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
          <ThemedStatusBar />
          <Routes />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
