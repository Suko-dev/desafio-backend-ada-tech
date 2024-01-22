import { NextFunction, Request, Response } from 'express';
import { BaseException } from '../errors/base-exception';
import { UnexpectedException } from '../errors/unexpected-exception';
import Logger from '../../application/utils/logger';

export async function errorHandlingMiddleware(
  error: BaseException | Error,
  req: Request,
  res: Response,
  // @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  Logger.log(
    `erro na rota: ${req.originalUrl} com o corpo ${JSON.stringify(req.body || '')} e parâmetros: ${JSON.stringify(req.params || '')}`,
    error,
  );
  if (isMappedException(error)) {
    return res.status(error.code).send(error.toJson());
  }

  Logger.log(error);
  const exception = new UnexpectedException();

  return res.status(exception.code).send(exception.toJson());
}

function isMappedException(error: Error | BaseException): error is BaseException {
  return error instanceof BaseException;
}
