export const decreaseGrams = (grams: number) => (grams <= 10 ? grams : grams - 10);

export const gramsAtLeastTen = (grams: number) => grams > 10;

export const formatAmount = (value: number) => {
  const rounded = Math.round(value * 10) / 10;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  const [whole, fraction] = rounded.toFixed(1).split('.');

  return `${whole},${fraction}`;
};

export const formatOneDecimal = (value: number) => {
  const [whole, fraction] = (Math.round(value * 10) / 10).toFixed(1).split('.');

  return `${whole},${fraction}`;
};

export const formatGrams = (grams: number) => {
  if (Number.isInteger(grams)) {
    return `${grams}g`;
  }

  return `${formatAmount(grams)}g`;
};

export const formatFact = (fact: { amount: number | null; unit: string }) => {
  if (fact.amount === null) {
    return `NA ${fact.unit}`;
  }

  return `${formatAmount(fact.amount)} ${fact.unit}`;
};

export const parseGramsInput = (value: string) => {
  const normalized = value.trim().replace(',', '.');

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return Math.round(parsed * 10) / 10;
};
