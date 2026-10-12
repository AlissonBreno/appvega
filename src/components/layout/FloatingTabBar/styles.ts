import { StyleSheet } from 'react-native';

/** Disco ativo. 4px para fora da pílula, em cima e em baixo. */
const ACTIVE_SIZE = 72;
/** Altura da pílula. */
const PILL_HEIGHT = 64;

export const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 1,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ACTIVE_SIZE,
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: (ACTIVE_SIZE - PILL_HEIGHT) / 2,
    height: PILL_HEIGHT,
    borderRadius: 9999,
    borderWidth: 1,
    zIndex: 0,
  },
  item: {
    width: ACTIVE_SIZE,
    height: ACTIVE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  activeCircle: {
    width: ACTIVE_SIZE,
    height: ACTIVE_SIZE,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
