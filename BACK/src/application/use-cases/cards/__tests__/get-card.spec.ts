import { CardRepository } from '../../../interfaces/card-repository';
import { fail, isFailure, isSuccess, succeed } from '../../../../domain/shared/either';
import { CardEntity } from '../../../../domain/entities/card.entity';
import { GetCardUseCase } from '../get-cards';
import { BaseException } from '../../../../api/errors/base-exception';

describe(`${GetCardUseCase.name}`, () => {
  let getCardUseCase: GetCardUseCase;

  const findMock = jest.fn();

  let repositoryMock: CardRepository = {
    find: findMock,
  } as unknown as CardRepository;

  beforeEach(() => {
    getCardUseCase = new GetCardUseCase(repositoryMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return all the cards', async () => {
    const card = new CardEntity('1', 'titulo', 'conteudo', 'lista');
    findMock.mockResolvedValue(succeed([card]));

    const result = await getCardUseCase.execute();

    expect(isSuccess(result)).toBeTruthy();
    expect(result.data).toEqual([card]);
  });

  it('should return an error when the repository does so', async () => {
    const error = new BaseException('Bad connection', 502);
    findMock.mockResolvedValue(fail(error));

    const result = await getCardUseCase.execute();

    expect(isFailure(result)).toBeTruthy();
    expect(result.error).toEqual(error);
  });
});
