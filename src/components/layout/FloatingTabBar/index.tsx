import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import { tabIcons } from '~/config/navigation';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { TabParamList } from '~/types/Navigation';

import { ACTIVE_SIZE, styles } from './styles';

const ICON_SIZE = 22;
const DISC_SLIDE_MS = 200;

const isTabRoute = (name: string): name is keyof TabParamList => {
  return Object.prototype.hasOwnProperty.call(tabIcons, name);
};

/** Posição visual do foco, contando só rotas que a pílula desenha. */
const tabSlot = (
  routes: ReadonlyArray<{ name: string }>,
  index: number,
): number | null => {
  let slot = 0;

  for (let position = 0; position < routes.length; position += 1) {
    if (!isTabRoute(routes[position].name)) {
      continue;
    }

    if (position === index) {
      return slot;
    }

    slot += 1;
  }

  return null;
};

/**
 * O navigator chama `tabBar(props)` como função, dentro do callback de um
 * Context.Consumer. Hooks aqui quebram as Rules of Hooks; o elemento abaixo
 * é o componente de verdade.
 */
const FloatingTabBar = (props: BottomTabBarProps) => {
  return <FloatingTabBarContent {...props} />;
};

const FloatingTabBarContent = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const { theme } = useNavigationTheme();
  const { colors } = theme;
  const slot = tabSlot(state.routes, state.index);
  const translateX = useRef(
    new Animated.Value((slot ?? 0) * ACTIVE_SIZE),
  ).current;
  const skipInitialSlide = useRef(true);

  useEffect(() => {
    if (slot == null) {
      return;
    }

    const toValue = slot * ACTIVE_SIZE;

    if (skipInitialSlide.current) {
      skipInitialSlide.current = false;
      translateX.setValue(toValue);
      return;
    }

    const animation = Animated.timing(translateX, {
      toValue,
      duration: DISC_SLIDE_MS,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [slot, translateX]);

  const focusedRoute = state.routes[state.index];
  const activeIcon =
    focusedRoute && isTabRoute(focusedRoute.name)
      ? tabIcons[focusedRoute.name]
      : null;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.host, { bottom: insets.bottom + 16 }]}
    >
      <View accessibilityRole="tabbar" style={styles.pill}>
        <View
          pointerEvents="none"
          style={[
            styles.track,
            {
              backgroundColor: colors.foreground,
              borderColor: colors.border,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          if (!isTabRoute(route.name)) {
            return null;
          }

          const { options } = descriptors[route.key];
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={
                options.tabBarAccessibilityLabel ?? route.name
              }
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}
            >
              <Icon
                name={tabIcons[route.name]}
                color={colors.secondaryText}
                size={ICON_SIZE}
              />
            </Pressable>
          );
        })}
        {activeIcon ? (
          <Animated.View
            accessible={false}
            pointerEvents="none"
            style={[
              styles.activeCircle,
              {
                backgroundColor: colors.primaryText,
                transform: [{ translateX }],
              },
            ]}
          >
            <Icon
              name={activeIcon}
              color={colors.foreground}
              size={ICON_SIZE}
            />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default FloatingTabBar;
