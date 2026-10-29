import { macroArcFractions } from './macroArcFractions';

describe('macroArcFractions', () => {
  test('keeps each progress when the sum is under one turn', () => {
    expect(macroArcFractions(0.5, 0.3, 0.1)).toEqual([0.5, 0.3, 0.1]);
  });

  test('shrinks every progress so the sum is one turn when it would overflow', () => {
    const [carb, protein, fat] = macroArcFractions(0.8, 0.6, 0.4);

    expect(carb + protein + fat).toBeCloseTo(1);
    expect(carb).toBeCloseTo(0.8 / 1.8);
    expect(protein).toBeCloseTo(0.6 / 1.8);
    expect(fat).toBeCloseTo(0.4 / 1.8);
  });

  test('counts negative progress as zero', () => {
    expect(macroArcFractions(-0.2, 0.4, 0.3)).toEqual([0, 0.4, 0.3]);

    const [carb, protein, fat] = macroArcFractions(-1, 0.8, 0.8);

    expect(carb).toBe(0);
    expect(protein).toBeCloseTo(0.5);
    expect(fat).toBeCloseTo(0.5);
  });
});
