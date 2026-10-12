import { StyleSheet } from 'react-native';

/** Círculo ativo. Maior que a pílula para extrapolar a barra, centrado nela. */
const ACTIVE_SIZE = 64;
/** Altura da pílula. O excedente do círculo fica 8px (sm) acima e abaixo. */
const PILL_HEIGHT = 64;

export const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ACTIVE_SIZE,
    paddingHorizontal: 16,
    gap: 8,
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: (ACTIVE_SIZE - PILL_HEIGHT) / 2,
    height: PILL_HEIGHT,
    borderRadius: 9999,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 6,
  },
  item: {
    width: ACTIVE_SIZE,
    height: ACTIVE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCircle: {
    width: ACTIVE_SIZE,
    height: ACTIVE_SIZE,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});
