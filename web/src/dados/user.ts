import { userMock } from 'mocks/user';
import type { User } from '../../../app/src/modules/User/types/User';

export type UserGoals = {
  goal_kcal: number;
  goal_carb: number;
  goal_prot: number;
  goal_fat: number;
};

const MOCK_UPDATE_DELAY_MS = 500;

export const getUser = (): User => userMock;

export const updateUserGoals = async (goals: UserGoals): Promise<User> => {
  await new Promise(resolve => {
    setTimeout(resolve, MOCK_UPDATE_DELAY_MS);
  });

  userMock.goal_kcal = goals.goal_kcal;
  userMock.goal_carb = goals.goal_carb;
  userMock.goal_prot = goals.goal_prot;
  userMock.goal_fat = goals.goal_fat;
  userMock.edited_at = new Date().toISOString();

  return { ...userMock };
};
