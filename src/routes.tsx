import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FloatingTabBar from '~/components/layout/FloatingTabBar';
import { stackScreenOptions, tabNavigatorOptions } from '~/config/navigation';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import type { StackParamList, TabParamList } from '~/types/Navigation';
import { navigationRef } from '~/utils/RootNavigation';

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={tabNavigatorOptions} tabBar={FloatingTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

/**
 * Regra de rota inicial centralizada. Placeholder: começa em `Main`.
 * Deve evoluir para depender de estados globais (ex.: usuário autenticado).
 */
const getInitialRouteName = (): keyof StackParamList => {
  return 'Main';
};

const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={stackScreenOptions}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
