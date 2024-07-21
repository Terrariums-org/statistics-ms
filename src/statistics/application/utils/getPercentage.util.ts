export const getPercentage = (
  max: number,
  min: number,
  value: number,
): string => {
  const midPoint = (max + min) / 2;

  const result = (value * 100) / midPoint;

  return `${result.toFixed(0)}%`;
};
