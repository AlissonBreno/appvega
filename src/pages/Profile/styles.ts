import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 16,
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
