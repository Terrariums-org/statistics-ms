export const getPercentage = (
  max: number,
  min: number,
  value: number,
): string => {
  if (value < min) return '0%';
  const rangeTotal = max - min;
  const percentage = ((value - min) / rangeTotal) * 100;
  return `${percentage.toFixed(0)}%`;
};
