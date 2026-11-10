import { useNavigate } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowDismiss, mealFlowPresentation } from '~/config/viewport';
import { useDesktop } from '~/hooks/useDesktop';
import { routes } from '~/types/Navigation';
import SearchFood from '.';

const SearchFoodRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const presentation = mealFlowPresentation(desktop);
  const dismiss = () => {
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
