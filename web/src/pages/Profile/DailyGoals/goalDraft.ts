export type GoalKey = 'goal_kcal' | 'goal_carb' | 'goal_prot' | 'goal_fat';

export type GoalDraft = Record<GoalKey, string>;

const FACTORS: Partial<Record<GoalKey, number>> = {
  goal_carb: 4,
  goal_prot: 4,
  goal_fat: 9,
};

export const GOAL_STEPS: Record<GoalKey, number> = {
  goal_kcal: 10,
  goal_carb: 10,
  goal_prot: 10,
  goal_fat: 5,
};

const parseGoalValue = (text: string) => {
  const normalized = text.trim().replace(',', '.');

  if (normalized === '' || normalized === '.' || normalized === '-') {
    return null;
  }

  const value = Number(normalized);

  return Number.isFinite(value) ? value : null;
};

export const sumMacroKcal = (draft: GoalDraft) =>
  (['goal_carb', 'goal_prot', 'goal_fat'] as const).reduce((sum, key) => {
    const grams = parseGoalValue(draft[key]);
    const factor = FACTORS[key];

    if (grams === null || factor === undefined) {
      return sum;
    }

    return sum + Math.round(grams * factor);
  }, 0);

export const stepGoal = (text: string, delta: number) => {
  const parsed = parseGoalValue(text);
  const next = Math.max(0, (parsed ?? 0) + delta);

  return Number.isInteger(next) ? String(next) : String(Math.round(next * 10) / 10);
};

export const draftIsValid = (draft: GoalDraft) =>
  (Object.keys(draft) as GoalKey[]).every(key => {
    const value = parseGoalValue(draft[key]);

    return value !== null && value >= 0;
  });

export const gramsPerKg = (gramsText: string, weight: number) => {
  const grams = parseGoalValue(gramsText);

  if (grams === null || weight <= 0) {
    return null;
  }

  const ratio = Math.round((grams / weight) * 10) / 10;

  return Number.isInteger(ratio) ? String(ratio) : ratio.toFixed(1);
};

export const macroKcal = (gramsText: string, key: GoalKey) => {
  const factor = FACTORS[key];
  const grams = parseGoalValue(gramsText);

  if (factor === undefined || grams === null) {
    return null;
  }

  return String(Math.round(grams * factor));
};
