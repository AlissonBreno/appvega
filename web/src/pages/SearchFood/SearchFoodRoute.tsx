import { useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowDismiss, mealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useDesktop } from '~/hooks/useDesktop';
import { BATCH_DISCARD_MESSAGE, shouldConfirmBatchLeave } from '~/pages/MealBatch/leave';
import { routes } from '~/types/Navigation';
import SearchFood from '.';

const SearchFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const { items, clear } = useMealBatch();
  const [params] = useSearchParams();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const dismiss = () => {
    if (shouldConfirmBatchLeave(items(mealId).length)) {
      if (!window.confirm(BATCH_DISCARD_MESSAGE)) {
        return;
      }
      clear(mealId);
    }

    if (mealFlowDismiss(presentation) === 'home') {
      navigate(routes.home);
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
