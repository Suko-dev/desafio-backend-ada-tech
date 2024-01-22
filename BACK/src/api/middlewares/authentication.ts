import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../errors/unauthorized-exception';
import { validateJwt } from '../../application/utils/token';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = (req.headers.Authorization || req.headers.authorization) as string;
  if (!auth) {
    return next(new UnauthorizedException());
  }
  const [, token] = auth.split(' ');
  const isValid = validateJwt(token);

  if (!isValid) {
    return next(new UnauthorizedException());
  }
  next();
}
