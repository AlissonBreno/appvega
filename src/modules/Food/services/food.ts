import { foodsMock } from '~/modules/Food/mocks/food';
import type { Food } from '~/types';

export const getFoods = (): Food[] => foodsMock;
