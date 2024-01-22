import { LoginUseCase } from '../login.use-case';
import { getEitherValue, isFailure, isSuccess } from '../../../../domain/shared/either';
import { UnauthorizedException } from '../../../../api/errors/unauthorized-exception';

describe(`${LoginUseCase.name}`, () => {
  let loginUseCase: LoginUseCase;
  let configMock = { AUTHENTICATION: { LOGIN: 'login', PASSWORD: 'correctPassword' } };

  beforeEach(() => {
    loginUseCase = new LoginUseCase(configMock);
  });

  it('should return an unauthorized exception when password is incorrect', async () => {
    const login = 'login';
    const password = 'incorrectPassword';

    const response = await loginUseCase.execute(login, password);

    expect(isFailure(response)).toBeTruthy();
    expect(getEitherValue(response)).toEqual(new UnauthorizedException());
  });

  it('should return an session token when user is password match user login', async () => {
    const login = 'login';
    const password = 'correctPassword';

    const response = await loginUseCase.execute(login, password);

    expect(isSuccess(response)).toBeTruthy();
    expect(typeof getEitherValue(response) === 'string').toBeTruthy();
  });
});
