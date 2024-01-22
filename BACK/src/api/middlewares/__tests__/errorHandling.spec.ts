import { Response, Request, NextFunction } from 'express';
import { errorHandlingMiddleware } from '../errorHandling';
import { UnauthorizedException } from '../../errors/unauthorized-exception';
import { UnexpectedException } from '../../errors/unexpected-exception';

describe(`${errorHandlingMiddleware.name}`, () => {
  const send = jest.fn();
  let res: Response;
  const next = {} as NextFunction;
  const req = {} as Request;

  beforeEach(() => {
    res = {
      status: jest.fn(() => ({
        send,
      })),
    } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return expected errors messages', () => {
    const erro = new UnauthorizedException();

    errorHandlingMiddleware(erro, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(send).toHaveBeenCalledWith(erro.toJson());
  });

  it('should return status code 500 with unexpected exception when a non expected error occurs', () => {
    const erro = new Error('Erro inesperado');

    errorHandlingMiddleware(erro, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(send).toHaveBeenCalledWith(new UnexpectedException().toJson());
  });
});
