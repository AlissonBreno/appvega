import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});
