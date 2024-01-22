import { NextFunction, Request, Response } from 'express';
import { isSuccess } from '../../../domain/shared/either';
import { LoginUseCase } from '../../../application/use-cases/login/login.use-case';
import { config } from '../../../config/environment-variables';

export class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const loginUseCase = new LoginUseCase(config);

    const { login, senha } = req.body;
    const result = await loginUseCase.execute(login, senha);

    if (isSuccess(result)) {
      const card = result.data;
      return res.status(201).setHeader('Content-Type', 'application/json').send(card);
    }
    next(result.error);
  }
}
