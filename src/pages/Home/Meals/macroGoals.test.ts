import { perMealMacroGoals } from './macroGoals';

describe('perMealMacroGoals', () => {
  test('splits daily goals evenly across meals', () => {
    expect(
      perMealMacroGoals({ carb: 250, protein: 150, fat: 65 }, 4),
    ).toEqual({
      carb: 62.5,
      protein: 37.5,
      fat: 16.25,
    });
  });

  test('returns zeros when mealCount is 0', () => {
    expect(
      perMealMacroGoals({ carb: 250, protein: 150, fat: 65 }, 0),
    ).toEqual({
      carb: 0,
      protein: 0,
      fat: 0,
    });
  });
});
