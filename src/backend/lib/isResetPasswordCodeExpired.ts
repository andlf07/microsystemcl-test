export const isResetPasswordCodeExpired = (createdAt: string): boolean => {
  const createdAtTime = new Date(createdAt).getTime();

  const currentTime = new Date().getTime();

  const timeDifference = currentTime - createdAtTime;

  const expiredTime = 10 * 60 * 1000;

  if (timeDifference > expiredTime) return false;
  else return true;
};
