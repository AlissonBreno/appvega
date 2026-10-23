import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    gap: 24,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
  },
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
  sectionTitle: {
    fontSize: 16,
    lineHeight: 21,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalCopy: {
    flex: 1,
    gap: 4,
  },
  goalLabel: {
    fontSize: 14,
    lineHeight: 21,
  },
  goalTotal: {
    fontSize: 14,
    lineHeight: 21,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  stepperValue: {
    minWidth: 40,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  idleButton: {
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.55,
  },
  idleLabel: {
    fontSize: 16,
    lineHeight: 21,
  },
  aboutTitle: {
    fontSize: 16,
    lineHeight: 21,
  },
  version: {
    fontSize: 13,
    lineHeight: 20,
  },
  aboutBody: {
    fontSize: 14,
    lineHeight: 21,
  },
});
