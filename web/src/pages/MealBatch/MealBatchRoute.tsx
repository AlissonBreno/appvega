import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Dialog from '~/components/ui/Dialog';
import { mealFlowPresentation } from '~/config/viewport';
import { useMealBatch } from '~/contexts/MealBatchContext';
import { useDesktop } from '~/hooks/useDesktop';
import { routes } from '~/types/Navigation';
import MealBatch from '.';
import { BATCH_DISCARD_MESSAGE, batchLeaveAction } from './leave';

const MealBatchRoute = () => {
  const desktop = useDesktop();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { items, clear } = useMealBatch();
  const presentation = mealFlowPresentation(desktop);
  const mealId = params.get('mealId') ?? '';
  const [saving, setSaving] = useState(false);

  const requestLeave = () => {
    const action = batchLeaveAction(items(mealId).length, saving);

    if (action === 'ignore' || (action === 'confirm' && !window.confirm(BATCH_DISCARD_MESSAGE))) {
      return;
    }

    clear(mealId);
    navigate(routes.home);
  };

  if (presentation === 'page') {
    return <MealBatch onBack={requestLeave} onSavingChange={setSaving} />;
  }

  return (
    <Dialog label="Confirmar lote" onClose={requestLeave}>
      <MealBatch
        onBack={requestLeave}
        onClose={requestLeave}
        onSavingChange={setSaving}
        embedded
      />
    </Dialog>
  );
};

export default MealBatchRoute;
