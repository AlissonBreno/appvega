import { foodsMock } from 'mocks/food';
import type { Food } from '~/types';

export const getFoods = (): Food[] => foodsMock;
