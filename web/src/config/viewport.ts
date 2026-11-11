export const DESKTOP_QUERY = '(min-width: 1024px)';

export type MealFlowPresentation = 'dialog' | 'page';

export type MealFlowDismiss = 'home' | 'history';

/** @deprecated Prefer mealFlowPresentation */
export type SearchFoodPresentation = MealFlowPresentation;

/** @deprecated Prefer mealFlowDismiss */
export type SearchFoodDismiss = MealFlowDismiss;

export const mealFlowPresentation = (desktop: boolean): MealFlowPresentation =>
  desktop ? 'dialog' : 'page';

export const mealFlowDismiss = (presentation: MealFlowPresentation): MealFlowDismiss =>
  presentation === 'dialog' ? 'home' : 'history';

/** @deprecated Prefer mealFlowPresentation */
export const searchFoodPresentation = mealFlowPresentation;

/** @deprecated Prefer mealFlowDismiss */
export const searchFoodDismiss = mealFlowDismiss;
