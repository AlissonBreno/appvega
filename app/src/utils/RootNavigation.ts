import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type { StackParamList } from '~/types/Navigation';

export const navigationRef = createNavigationContainerRef<StackParamList>();

export const navigate = <RouteName extends keyof StackParamList>(
  ...args: undefined extends StackParamList[RouteName]
    ? [name: RouteName] | [name: RouteName, params: StackParamList[RouteName]]
    : [name: RouteName, params: StackParamList[RouteName]]
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...(args as never));
  }
};

export const replace = <RouteName extends keyof StackParamList>(
  name: RouteName,
  params?: StackParamList[RouteName],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as string, params));
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};
