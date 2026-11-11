import type { MealFlowPresentation } from '~/config/viewport';

export type AddFoodBackDestination = 'history' | 'home' | 'search';

export type AddFoodSaveDestination = 'history' | 'home';

export const addFoodBackDestination = (
  presentation: MealFlowPresentation,
  editing: boolean,
): AddFoodBackDestination => {
  if (presentation === 'page') {
    return 'history';
  }

  return editing ? 'home' : 'search';
};

export const addFoodSaveDestination = (
  presentation: MealFlowPresentation,
  editing: boolean,
): AddFoodSaveDestination => {
  if (!editing) {
    return 'home';
  }

  return presentation === 'page' ? 'history' : 'home';
};
