import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import Icon, { type IconName } from '~/components/ui/Icon';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { styles, TOAST_TEXT_COLOR } from './styles';

const MOTION_MS = 220;

export type ToastVariant = 'success' | 'danger' | 'warning';

const ICONS: Record<ToastVariant, IconName> = {
  success: 'check',
  danger: 'exclamation-circle',
  warning: 'exclamation-triangle',
};

type ToastProps = {
  message: string;
  variant: ToastVariant;
  exiting: boolean;
  onDismiss: () => void;
  onHidden: () => void;
};

const Toast = ({
  message,
  variant,
  exiting,
  onDismiss,
  onHidden,
}: ToastProps) => {
  const { theme } = useNavigationTheme();
  const translateY = useRef(new Animated.Value(1000)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const measuredRef = useRef(false);
  const onHiddenRef = useRef(onHidden);
  const [travel, setTravel] = useState(0);

  onHiddenRef.current = onHidden;

  const animateTo = useCallback(
    (toValue: number, onEnd?: () => void) => {
      animationRef.current?.stop();

      const animation = Animated.timing(translateY, {
        toValue,
        duration: MOTION_MS,
        useNativeDriver: true,
      });

      animationRef.current = animation;
      animation.start(({ finished }) => {
        if (finished) {
          onEnd?.();
        }
      });
    },
    [translateY],
  );

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (!exiting || travel === 0) {
      return undefined;
    }

    let active = true;

    animateTo(travel, () => {
      if (active) {
        onHiddenRef.current();
      }
    });

    return () => {
      active = false;
      animationRef.current?.stop();
    };
  }, [animateTo, exiting, travel]);

  return (
    <View pointerEvents="box-none" collapsable={false} style={styles.slot}>
      <Animated.View
        pointerEvents="box-none"
        onLayout={({ nativeEvent }) => {
          const nextHeight = nativeEvent.layout.height;

          if (nextHeight === 0 || measuredRef.current) {
            return;
          }

          measuredRef.current = true;

          translateY.setValue(nextHeight);
          setTravel(nextHeight);

          if (!exiting) {
            animateTo(0);
          }
        }}
        style={{ transform: [{ translateY }] }}
      >
        <Pressable
          accessibilityRole="alert"
          accessibilityLabel={message}
          onPress={onDismiss}
          style={[
            styles.banner,
            { backgroundColor: theme.colors.toast[variant] },
          ]}
        >
          <Icon name={ICONS[variant]} size={16} color={TOAST_TEXT_COLOR} />
          <Text style={styles.message}>{message}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Toast;
