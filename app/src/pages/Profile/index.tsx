import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  View,
  type TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '~/components/shared/ScreenHeader';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';
import { useUser } from '~/hooks/useUser';

import AppAbout from './AppAbout';
import DailyGoals from './DailyGoals';
import ProfileSummary from './ProfileSummary';
import Tools from './Tools';
import { styles } from './styles';

const TAB_CLEARANCE = 72 + 16 + 24;
const KEYBOARD_PADDING = 24;
const FOCUS_TOP_RATIO = 0.9;

const Profile = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useNavigationTheme();
  const { colors } = theme;
  const { user, setUser } = useUser();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  const contentOffsetY = useRef(0);
  const focusedInputRef = useRef<RefObject<TextInput | null> | null>(null);
  const keyboardHeightRef = useRef(0);

  const scrollFocusedInputIntoView = useCallback(
    (inputRef: RefObject<TextInput | null>) => {
      focusedInputRef.current = inputRef;

      requestAnimationFrame(() => {
        const input = inputRef.current;
        const scroll = scrollRef.current;

        if (!input || !scroll) {
          return;
        }

        scroll.measureInWindow((_sx, scrollWindowY, _sw, scrollWindowHeight) => {
          input.measureInWindow((_ix, inputWindowY) => {
            const inputYInContent =
              contentOffsetY.current + (inputWindowY - scrollWindowY);
            const visibleHeight = Math.max(
              0,
              scrollWindowHeight - keyboardHeightRef.current,
            );
            const targetY = Math.max(
              0,
              inputYInContent - visibleHeight * FOCUS_TOP_RATIO,
            );

            scroll.scrollTo({ y: targetY, animated: true });
          });
        });
      });
    },
    [],
  );

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = Keyboard.addListener(showEvent, event => {
      const height = event.endCoordinates.height;
      keyboardHeightRef.current = height;
      setKeyboardHeight(height);

      if (focusedInputRef.current) {
        scrollFocusedInputIntoView(focusedInputRef.current);
      }
    });

    const onHide = Keyboard.addListener(hideEvent, () => {
      keyboardHeightRef.current = 0;
      setKeyboardHeight(0);
      focusedInputRef.current = null;
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [scrollFocusedInputIntoView]);

  const paddingBottom =
    keyboardHeight > 0
      ? keyboardHeight + KEYBOARD_PADDING
      : insets.bottom + TAB_CLEARANCE;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader.Root>
        <ScreenHeader.Row>
          <ScreenHeader.Icon name="user-cog" />
          <ScreenHeader.Title>Perfil & metas</ScreenHeader.Title>
        </ScreenHeader.Row>
        <ScreenHeader.Subtitle>
          Configure suas metas nutricionais
        </ScreenHeader.Subtitle>
      </ScreenHeader.Root>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
        onScroll={event => {
          contentOffsetY.current = event.nativeEvent.contentOffset.y;
        }}
      >
        <ProfileSummary user={user} />
        <DailyGoals
          user={user}
          onUserUpdated={setUser}
          onFocusGoalInput={scrollFocusedInputIntoView}
        />
        <Tools />
        <AppAbout />
      </ScrollView>
    </View>
  );
};

export default Profile;
