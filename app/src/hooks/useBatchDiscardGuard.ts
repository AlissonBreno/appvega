import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { useMealBatch } from '~/modules/Meal/contexts/MealBatchContext';
import type { StackParamList } from '~/types/Navigation';

type BatchGuardNavigation = StackNavigationProp<StackParamList>;

/**
 * Pergunta "Descartar o lote?" sempre que a tela for removida com rascunho
 * (botão do header, gesto de voltar do iOS e botão voltar do Android).
 * Descartar limpa o rascunho e sai do fluxo para `Main`.
 * `withoutGuard` permite saídas programáticas que preservam o rascunho.
 */
export const useBatchDiscardGuard = (
  navigation: BatchGuardNavigation,
  mealId: string,
) => {
  const { hasDraft, clear } = useMealBatch();
  const bypassRef = useRef(false);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', event => {
        if (bypassRef.current || !hasDraft(mealId)) {
          return;
        }

        event.preventDefault();
        Alert.alert('Descartar o lote?', undefined, [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => {
              clear(mealId);
              navigation.popTo('Main');
            },
          },
        ]);
      }),
    [navigation, hasDraft, clear, mealId],
  );

  const withoutGuard = (exit: () => void) => {
    bypassRef.current = true;

    try {
      exit();
    } finally {
      bypassRef.current = false;
    }
  };

  return { withoutGuard };
};
