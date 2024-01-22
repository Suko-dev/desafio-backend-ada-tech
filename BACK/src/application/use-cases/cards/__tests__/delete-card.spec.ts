import { CardRepository } from '../../../interfaces/card-repository';
import { fail, isFailure, isSuccess, succeed } from '../../../../domain/shared/either';
import { NotFoundException } from '../../../../api/errors/not-found-exception';
import { DeleteCardUseCase } from '../delete-card';
import { CardEntity } from '../../../../domain/entities/card.entity';

describe(`${DeleteCardUseCase.name}`, () => {
  let deleteCardUseCase: DeleteCardUseCase;
  const deleteMock = jest.fn();
  const findMock = jest.fn();

  let repositoryMock: CardRepository = {
    delete: deleteMock,
    find: findMock,
  } as unknown as CardRepository;

  beforeEach(() => {
    deleteCardUseCase = new DeleteCardUseCase(repositoryMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the remaining cards', async () => {
    deleteMock.mockResolvedValue(succeed());
    const card = new CardEntity('1', 'titulo', 'conteudo', 'lista');
    findMock.mockResolvedValue(succeed([card]));

    const result = await deleteCardUseCase.execute('2');

    expect(isSuccess(result)).toBeTruthy();
    expect(result.data).toEqual([card]);
  });

  it('should return an error when the repository does so', async () => {
    const error = new NotFoundException();
    deleteMock.mockResolvedValue(fail(error));

    const result = await deleteCardUseCase.execute('1');

    expect(isFailure(result)).toBeTruthy();
    expect(result.error).toEqual(error);
  });
});
