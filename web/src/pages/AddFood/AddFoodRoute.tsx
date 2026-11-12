import { useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowDismiss, mealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useDesktop } from '~/hooks/useDesktop';
import { BATCH_DISCARD_MESSAGE, shouldConfirmBatchLeave } from '../MealBatch/leave';
import { routes, searchFoodPath } from '~/types/Navigation';
import AddFood from '.';
import { addFoodBackDestination } from './navigation';

const AddFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const { items, clear } = useMealBatch();
  const [params] = useSearchParams();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const editing = Boolean(params.get('mealFoodId'));

  const leaveToHome = () => {
    if (!editing && shouldConfirmBatchLeave(items(mealId).length)) {
      if (!window.confirm(BATCH_DISCARD_MESSAGE)) {
        return;
      }
      clear(mealId);
    }

    navigate(routes.home);
  };

  const dismiss = () => {
    if (mealFlowDismiss(presentation) === 'home') {
      leaveToHome();
      return;
    }

    navigate(-1);
  };

  const onBack = () => {
    const destination = addFoodBackDestination(presentation, editing);

    if (destination === 'search') {
      navigate(searchFoodPath({ mealId, subtitle }));
      return;
    }

    if (destination === 'home') {
      leaveToHome();
      return;
    }

    navigate(-1);
  };

  if (presentation === 'page') {
    return <AddFood onBack={onBack} presentation={presentation} />;
  }

  return (
    <Dialog label="Adicionando em" onClose={dismiss}>
      <AddFood
        onBack={onBack}
        onClose={dismiss}
        embedded
        presentation={presentation}
      />
    </Dialog>
  );
};

export default AddFoodRoute;
