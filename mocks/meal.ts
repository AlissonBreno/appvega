import type { Meal } from '../app/src/modules/Meal/types/Meal';

export const mealsMock: Meal[] = [
  {
    id_meal: 1,
    id_user: 1,
    name: 'Café da manhã',
    emoji: '☕',
    created_at: '2026-01-01T00:00:00.000Z',
    edited_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id_meal: 2,
    id_user: 1,
    name: 'Almoço',
    emoji: '🍛',
    created_at: '2026-01-01T00:00:00.000Z',
    edited_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id_meal: 3,
    id_user: 1,
    name: 'Café da tarde',
    emoji: '🍎',
    created_at: '2026-01-01T00:00:00.000Z',
    edited_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id_meal: 4,
    id_user: 1,
    name: 'Jantar',
    emoji: '🍜',
    created_at: '2026-01-01T00:00:00.000Z',
    edited_at: '2026-01-01T00:00:00.000Z',
  },
];
