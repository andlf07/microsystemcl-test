import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const randomNUmber = Math.random();
  const salt = Math.floor(randomNUmber * (16 - 1 + 1)) + 1;

  const passwordHash = bcrypt.hashSync(password, salt);
  return { salt, passwordHash };
};
