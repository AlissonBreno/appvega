export type GoalKey = 'goal_kcal' | 'goal_carb' | 'goal_prot' | 'goal_fat';

export type GoalDraft = Record<GoalKey, string>;

export type GoalValues = Record<GoalKey, number>;

export const GOAL_STEPS: Record<GoalKey, number> = {
  goal_kcal: 10,
  goal_carb: 10,
  goal_prot: 10,
  goal_fat: 5,
};

export const GOAL_KEYS: GoalKey[] = [
  'goal_kcal',
  'goal_carb',
  'goal_prot',
  'goal_fat',
];

export const parseGoalValue = (text: string): number | null => {
  const normalized = text.trim().replace(',', '.');

  if (normalized === '' || normalized === '.' || normalized === '-') {
    return null;
  }

  const value = Number(normalized);

  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
};

export const formatGoalValue = (value: number): string => {
  const rounded = Math.round(value * 10) / 10;

  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

/** Fatores Atwater gerais (FAO/USDA): energia metabolizável média por grama. */
export const MACRO_KCAL_PER_GRAM: Partial<Record<GoalKey, number>> = {
  goal_carb: 4,
  goal_prot: 4,
  goal_fat: 9,
};

export const MACRO_GOAL_KEYS: GoalKey[] = [
  'goal_carb',
  'goal_prot',
  'goal_fat',
];

export const sumMacroKcal = (draft: GoalDraft): number => {
  let sum = 0;

  for (const key of MACRO_GOAL_KEYS) {
    const grams = parseGoalValue(draft[key]);
    const kcalPerGram = MACRO_KCAL_PER_GRAM[key];

    if (grams === null || kcalPerGram === undefined) {
      continue;
    }

    sum += Math.round(grams * kcalPerGram);
  }

  return sum;
};

export const syncGoalKcalFromMacros = (draft: GoalDraft): GoalDraft => {
  const sum = sumMacroKcal(draft);

  return { ...draft, goal_kcal: formatGoalValue(sum) };
};

export const formatGramsPerKg = (
  gramsText: string,
  weightKg: number,
): string | null => {
  const grams = parseGoalValue(gramsText);

  if (grams === null || weightKg <= 0) {
    return null;
  }

  return formatGoalValue(grams / weightKg);
};

export const formatMacroKcal = (
  gramsText: string,
  goalKey: GoalKey,
): string | null => {
  const kcalPerGram = MACRO_KCAL_PER_GRAM[goalKey];
  const grams = parseGoalValue(gramsText);

  if (kcalPerGram === undefined || grams === null) {
    return null;
  }

  return String(Math.round(grams * kcalPerGram));
};

export const stepGoalValue = (text: string, delta: number): string => {
  const parsed = parseGoalValue(text);
  const base = parsed === null ? 0 : parsed;
  const next = Math.max(0, base + delta);

  return formatGoalValue(next);
};

export const isValidGoalValue = (text: string): boolean => {
  const value = parseGoalValue(text);

  return value !== null && value >= 0;
};

export const toGoalDraft = (values: GoalValues): GoalDraft => ({
  goal_kcal: formatGoalValue(values.goal_kcal),
  goal_carb: formatGoalValue(values.goal_carb),
  goal_prot: formatGoalValue(values.goal_prot),
  goal_fat: formatGoalValue(values.goal_fat),
});

export const parseGoalDraft = (draft: GoalDraft): GoalValues | null => {
  const values = {} as GoalValues;

  for (const key of GOAL_KEYS) {
    const value = parseGoalValue(draft[key]);

    if (value === null || value < 0) {
      return null;
    }

    values[key] = Math.round(value * 10) / 10;
  }

  return values;
};

export const hasGoalChanges = (draft: GoalDraft, saved: GoalValues): boolean => {
  const parsed = parseGoalDraft(draft);

  if (parsed === null) {
    return false;
  }

  return GOAL_KEYS.some(
    key => formatGoalValue(parsed[key]) !== formatGoalValue(saved[key]),
  );
};
