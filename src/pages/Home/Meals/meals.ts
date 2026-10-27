import type { Meal } from './types';

export const meals: Meal[] = [
  {
    id: 'cafe-da-manha',
    title: 'Café da manhã',
    emoji: '☕',
    kcal: 434,
    itemCount: 3,
    macros: { carb: 36, protein: 24, fat: 8 },
    macroGoal: 100,
    foods: [],
  },
  {
    id: 'almoco',
    title: 'Almoço',
    emoji: '🍛',
    kcal: 769,
    itemCount: 3,
    macros: { carb: 14, protein: 6, fat: 3 },
    macroGoal: 100,
    foods: [],
  },
  {
    id: 'cafe-da-tarde',
    title: 'Café da tarde',
    emoji: '🍎',
    kcal: 648,
    itemCount: 3,
    macros: { carb: 18, protein: 14, fat: 10 },
    macroGoal: 100,
    foods: [],
  },
  {
    id: 'jantar',
    title: 'Jantar',
    emoji: '🍜',
    kcal: 655,
    itemCount: 3,
    macros: { carb: 30, protein: 20, fat: 6 },
    macroGoal: 100,
    foods: [],
  },
];
