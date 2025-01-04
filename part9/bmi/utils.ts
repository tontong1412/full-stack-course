export const isArrayOfNumber = (array: unknown): boolean => {
  if(!Array.isArray(array)) return false;
  return !array.some(element => isNaN(element as number));
};