export const macroArcFractions = (
  carb: number,
  protein: number,
  fat: number,
): [number, number, number] => {
  const progresses = [carb, protein, fat].map(progress =>
    Math.max(progress, 0),
  );
  const sum = progresses.reduce((total, progress) => total + progress, 0);
  const scale = sum > 1 ? 1 / sum : 1;

  return [
    progresses[0] * scale,
    progresses[1] * scale,
    progresses[2] * scale,
  ];
};
