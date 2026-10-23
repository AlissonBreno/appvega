import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  avatarBand: {
    flex: 1,
  },
  avatarShine: {
    position: 'absolute',
    right: 6,
    top: 8,
  },
  identityCopy: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    lineHeight: 21,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    lineHeight: 21,
  },
  caption: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
});
