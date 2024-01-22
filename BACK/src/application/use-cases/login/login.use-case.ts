import { Either, fail, succeed } from '../../../domain/shared/either';
import { UnauthorizedException } from '../../../api/errors/unauthorized-exception';
import { generateJwt, validateJwt } from '../../utils/token';
import Logger from '../../utils/logger';

export class LoginUseCase {
  constructor(private config: { AUTHENTICATION: { LOGIN: string; PASSWORD: string } }) {}
  async execute(login: string, password: string): Promise<Either<UnauthorizedException, string>> {
    const isValid = this._validateLogin(login, password);

    if (!isValid) {
      return fail(new UnauthorizedException());
    }
    const token = generateJwt({ login });
    try {
      validateJwt(token);
    } catch (e) {
      Logger.log(e as Error);
    }
    return succeed(token);
  }

  private _validateLogin(login: string, password: string) {
    return (
      login === this.config.AUTHENTICATION.LOGIN && password === this.config.AUTHENTICATION.PASSWORD
    );
  }
}
