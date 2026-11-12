import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useDesktop } from '~/hooks/useDesktop';
import {
  BATCH_DISCARD_MESSAGE,
  searchDismissDestination,
  shouldConfirmBatchLeave,
} from '~/pages/MealBatch/leave';
import { routes } from '~/types/Navigation';
import SearchFood from '.';

const SearchFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clear } = useMealBatch();
  const [params] = useSearchParams();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const fromBatch = Boolean((location.state as { fromBatch?: boolean } | null)?.fromBatch);
  const dismiss = () => {
    const draftCount = items(mealId).length;

    if (shouldConfirmBatchLeave(draftCount)) {
      if (!window.confirm(BATCH_DISCARD_MESSAGE)) {
        return;
      }
      clear(mealId);
    }

    if (searchDismissDestination({ presentation, draftCount, fromBatch }) === 'home') {
      navigate(routes.home, { replace: fromBatch });
      return;
    }

    navigate(-1);
  };

  if (presentation === 'page') {
    return <SearchFood onBack={dismiss} />;
  }

  return (
    <Dialog label="Buscar Alimento" onClose={dismiss}>
      <SearchFood onClose={dismiss} embedded />
    </Dialog>
  );
};

export default SearchFoodRoute;
