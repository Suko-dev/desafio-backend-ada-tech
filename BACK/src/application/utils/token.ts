import bcrypt from 'bcrypt';
import { config } from '../../config/environment-variables';
import jwt from 'jsonwebtoken';

export const validatePassword = async (
  hashPassword: string,
  password: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const generateJwt = <T extends string | Record<string, unknown> | Buffer>(
  payload: T,
): string => {
  return jwt.sign(payload, config.AUTHENTICATION.JWT.SECRET, {
    expiresIn: config.AUTHENTICATION.JWT.EXPIRATION,
  });
};

export const validateJwt = (token: string): boolean => {
  try {
    jwt.verify(token, config.AUTHENTICATION.JWT.SECRET);
    return true;
  } catch (e) {
    return false;
  }
};
