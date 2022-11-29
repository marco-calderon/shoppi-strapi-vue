export const formatPice = (v: number): string => {
  if (!v) {
    return "$0.00";
  }
  return `$${v.toFixed(2)}`;
};
