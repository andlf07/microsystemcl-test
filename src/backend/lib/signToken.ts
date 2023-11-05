import jwt from 'jsonwebtoken';
import { config } from '~/consts/config';

export const signToken = (payload: any) => {
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: 7 * 24 * 3600,
  });

  return token;
};
