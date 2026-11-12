import { mealFlowDismiss, type MealFlowPresentation } from '~/config/viewport';

export type BatchLeaveAction = 'ignore' | 'confirm' | 'leave';

export type SearchDismissDestination = 'home' | 'history';

/** Estado de navegação que marca que a busca nasceu de dentro do fluxo de lote. */
export const BATCH_FLOW_STATE = { fromBatch: true } as const;

export const shouldConfirmBatchLeave = (count: number) => count > 0;

/** Com itens no rascunho, a busca oferece voltar ao lote em vez de sair do fluxo. */
export const searchReturnsToBatch = (draftCount: number) => draftCount > 0;

export const BATCH_DISCARD_MESSAGE = 'Descartar o lote?';

export const SEARCH_BACK_TO_BATCH_LABEL = 'Voltar ao lote';

export const SEARCH_CLOSE_BATCH_LABEL = 'Fechar e descartar o lote';

export const batchLeaveAction = (count: number, saving: boolean): BatchLeaveAction => {
  if (saving) {
    return 'ignore';
  }

  return shouldConfirmBatchLeave(count) ? 'confirm' : 'leave';
};

type SearchDismissInput = {
  presentation: MealFlowPresentation;
  draftCount: number;
  fromBatch: boolean;
};

/**
 * Voltar pelo histórico a partir da busca reabriria o MealBatch (ou o AddFood
 * que o abriu) quando o lote fez parte do fluxo, e um MealBatch vazio
 * redireciona de novo para a busca. Nesses casos a saída vai para a Home.
 */
export const searchDismissDestination = ({
  presentation,
  draftCount,
  fromBatch,
}: SearchDismissInput): SearchDismissDestination => {
  if (mealFlowDismiss(presentation) === 'home') {
    return 'home';
  }

  return fromBatch || shouldConfirmBatchLeave(draftCount) ? 'home' : 'history';
};
