import { Request, Response } from 'express';
import { authMiddleware } from '../authentication';
import { UnauthorizedException } from '../../errors/unauthorized-exception';

describe(`${authMiddleware.name}`, () => {
  let req: Request;
  let requestMock: Request = { headers: {} } as Request;
  const res = {} as Response;
  let next = jest.fn();
  const unauthorizedException = new UnauthorizedException();

  beforeEach(() => {
    requestMock = { headers: {} } as Request;
    next = jest.fn();
    req = requestMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call next middleware when a token is valid', async () => {
    const validJwt =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDU2MzQ1OTR9.bUZjwaZrTb0lgBpkCViIMT98XRrKTrofpifPsQ9fyXo';
    requestMock.headers = { Authorization: validJwt };

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call error middleware with unauthorized exception when a jwt is invalid', async () => {
    const invalidJwt =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImxldHNjb2RlIiwic2VuaGEiOiJsZXRzQDEyMyIsImlhdCI6MTcwNTYyOTA1Nn0.mG6dSg_yq5y354uDTgxVpOZnNADaG3TZMGtvEHdWxg0';
    requestMock.headers = { Authorization: invalidJwt };

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(unauthorizedException);
  });

  it('should call error middleware with unauthorized exception when a jwt is expired', async () => {
    const expiredJwt =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImxldHNjb2RlIiwic2VuaGEiOiJsZXRzQDEyMyIsImlhdCI6MTcwNTYyODk3NCwiZXhwIjoxNzA1NjI4OTc1fQ.bb5OvOynri6VsqzXLyIKV1AgvFGd2oJp3ZLW3LJtRZY';
    requestMock.headers = { Authorization: expiredJwt };

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(unauthorizedException);
  });

  it('should call error middleware with unauthorized exception when there is no jwt', async () => {
    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(unauthorizedException);
  });
});
