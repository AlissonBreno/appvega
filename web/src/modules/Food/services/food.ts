import { foodsMock } from 'mocks/food';
import type { Food } from '../../../../../app/src/modules/Food/types/Food';

export const getFoods = (): Food[] => foodsMock;
