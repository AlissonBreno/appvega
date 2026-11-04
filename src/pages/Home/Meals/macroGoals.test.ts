import { perMealMacroGoals } from './macroGoals';

describe('perMealMacroGoals', () => {
  test('keeps the daily goals as the meal ceiling', () => {
    expect(perMealMacroGoals({ carb: 250, protein: 150, fat: 65 })).toEqual({
      carb: 250,
      protein: 150,
      fat: 65,
    });
  });
});
