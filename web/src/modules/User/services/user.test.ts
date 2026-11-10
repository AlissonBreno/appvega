import { userMock } from 'mocks/user';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getUser, updateUserGoals } from './user';

const originalUser = { ...userMock };

afterEach(() => {
  Object.assign(userMock, originalUser);
  vi.useRealTimers();
});

describe('getUser', () => {
  it('devolve o mesmo objeto do mock', () => {
    expect(getUser()).toBe(userMock);
    expect(getUser()).toMatchObject({
      name: 'Alisson Goulart',
      age: 27,
      weight: 75,
      email: 'alisson.goulart@example.com',
      goal_kcal: 2200,
      goal_carb: 220,
      goal_prot: 150,
      goal_fat: 75,
    });
  });
});

describe('updateUserGoals', () => {
  it('espera 500 ms, grava as metas e devolve uma cópia', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-09T15:00:00.000Z'));

    let settled = false;
    const pending = updateUserGoals({
      goal_kcal: 2155,
      goal_carb: 200,
      goal_prot: 160,
      goal_fat: 70,
    }).then(user => {
      settled = true;
      return user;
    });

    await vi.advanceTimersByTimeAsync(499);
    expect(settled).toBe(false);
    expect(userMock.goal_kcal).toBe(2200);

    await vi.advanceTimersByTimeAsync(1);
    const updated = await pending;

    expect(settled).toBe(true);
    expect(updated).not.toBe(userMock);
    expect(updated.goal_kcal).toBe(2155);
    expect(updated.goal_carb).toBe(200);
    expect(updated.goal_prot).toBe(160);
    expect(updated.goal_fat).toBe(70);
    expect(updated.edited_at).toBe('2026-11-09T15:00:00.500Z');
    expect(userMock.goal_kcal).toBe(2155);
    expect(userMock.email).toBe('alisson.goulart@example.com');
    expect(userMock.name).toBe('Alisson Goulart');
    expect(userMock.age).toBe(27);
    expect(userMock.weight).toBe(75);
  });
});
