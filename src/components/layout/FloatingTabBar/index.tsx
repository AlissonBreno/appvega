import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';

import Icon from '~/components/ui/Icon';
import { tabIcons } from '~/config/navigation';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import type { TabParamList } from '~/types/Navigation';

import { styles } from './styles';

const ICON_SIZE = 24;

function isTabRoute(name: string): name is keyof TabParamList {
  return Object.prototype.hasOwnProperty.call(tabIcons, name);
}

/**
 * O navigator chama `tabBar(props)` como função, dentro do callback de um
 * Context.Consumer. Hooks aqui quebram as Rules of Hooks; o elemento abaixo
 * é o componente de verdade.
 */
function FloatingTabBar(props: BottomTabBarProps) {
  return <FloatingTabBarContent {...props} />;
}

function FloatingTabBarContent({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const { isDark, theme } = useNavigationTheme();
  const { colors } = theme;
  const activeIconColor = isDark ? colors.background : colors.foreground;
  const shadowColor = isDark ? colors.background : colors.primaryText;

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
            { backgroundColor: colors.foreground, shadowColor },
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
              {focused ? (
                <View
                  style={[
                    styles.activeCircle,
                    { backgroundColor: colors.primaryText, shadowColor },
                  ]}
                >
                  <Icon
                    name={tabIcons[route.name]}
                    color={activeIconColor}
                    size={ICON_SIZE}
                  />
                </View>
              ) : (
                <Icon
                  name={tabIcons[route.name]}
                  color={colors.secondaryText}
                  size={ICON_SIZE}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default FloatingTabBar;
