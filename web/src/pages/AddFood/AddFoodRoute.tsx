import { useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowDismiss, mealFlowPresentation } from '~/config/viewport';
import { useDesktop } from '~/hooks/useDesktop';
import { routes, searchFoodPath } from '~/types/Navigation';
import AddFood from '.';
import { addFoodBackDestination } from './navigation';

const AddFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const subtitle = params.get('subtitle') ?? '';
  const editing = Boolean(params.get('mealFoodId'));

  const dismiss = () => {
    if (mealFlowDismiss(presentation) === 'home') {
      navigate(routes.home);
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
      navigate(routes.home);
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
