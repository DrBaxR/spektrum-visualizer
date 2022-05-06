export const isNumberValidator = (value: string): boolean => {
  const val = Number(value);

  return !isNaN(val);
};
