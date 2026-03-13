export const safePercent = (num, den) => (Number(den) ? ((Number(num) / Number(den)) * 100).toFixed(2) : '0.00');
