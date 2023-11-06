export const genResetPasswordCode = (): number => {
  const code = Math.floor(Math.random() * 90000000) + 10000000;
  return Number(code.toString().substring(0, 5));
};
