import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useDesktop } from '~/hooks/useDesktop';
import {
  BATCH_DISCARD_MESSAGE,
  SEARCH_BACK_TO_BATCH_LABEL,
  SEARCH_CLOSE_BATCH_LABEL,
  searchDismissDestination,
  searchReturnsToBatch,
  shouldConfirmBatchLeave,
} from '~/pages/MealBatch/leave';
import { mealBatchPath, routes } from '~/types/Navigation';
import SearchFood from '.';

const SearchFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clear } = useMealBatch();
  const [params] = useSearchParams();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const fromBatch = Boolean((location.state as { fromBatch?: boolean } | null)?.fromBatch);
  const draftCount = items(mealId).length;
  const returnToBatch = searchReturnsToBatch(draftCount);

  const dismiss = () => {
    if (shouldConfirmBatchLeave(draftCount)) {
      if (!window.confirm(BATCH_DISCARD_MESSAGE)) {
        return;
      }
      clear(mealId);
    }

    if (searchDismissDestination({ presentation, draftCount, fromBatch }) === 'home') {
      navigate(routes.home, { replace: fromBatch || returnToBatch });
      return;
    }

    navigate(-1);
  };

  const goToBatch = () => {
    navigate(mealBatchPath({ mealId, subtitle }), { replace: true });
  };

  if (presentation === 'page') {
    if (returnToBatch) {
      return (
        <SearchFood
          onBack={goToBatch}
          onClose={dismiss}
          backLabel={SEARCH_BACK_TO_BATCH_LABEL}
          closeLabel={SEARCH_CLOSE_BATCH_LABEL}
        />
      );
    }

    return <SearchFood onBack={dismiss} />;
  }

  if (returnToBatch) {
    return (
      <Dialog label="Buscar Alimento" onClose={dismiss}>
        <SearchFood
          onBack={goToBatch}
          onClose={dismiss}
          backLabel={SEARCH_BACK_TO_BATCH_LABEL}
          closeLabel={SEARCH_CLOSE_BATCH_LABEL}
          embedded
        />
      </Dialog>
    );
  }

  return (
    <Dialog label="Buscar Alimento" onClose={dismiss}>
      <SearchFood onClose={dismiss} embedded />
    </Dialog>
  );
};

export default SearchFoodRoute;
