export const DESKTOP_QUERY = '(min-width: 1024px)';

export type SearchFoodPresentation = 'dialog' | 'page';

export type SearchFoodDismiss = 'home' | 'history';

export const searchFoodPresentation = (desktop: boolean): SearchFoodPresentation =>
  desktop ? 'dialog' : 'page';

export const searchFoodDismiss = (presentation: SearchFoodPresentation): SearchFoodDismiss =>
  presentation === 'dialog' ? 'home' : 'history';
