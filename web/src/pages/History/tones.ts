import type { BarTone } from './history';

export const toneColor: Record<BarTone, string> = {
  above: 'var(--error)',
  near: 'var(--secondary)',
  within: 'var(--primary)',
};
