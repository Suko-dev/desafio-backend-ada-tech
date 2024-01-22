import { CreateCardUseCase } from '../create-card';
import { CardRepository } from '../../../interfaces/card-repository';
import { fail, isFailure, isSuccess, succeed } from '../../../../domain/shared/either';
import { BaseException } from '../../../../api/errors/base-exception';

describe(`${CreateCardUseCase.name}`, () => {
  let createCardUseCase: CreateCardUseCase;
  const saveMock = jest.fn();
  let repositoryMock: CardRepository = {
    save: saveMock,
  } as unknown as CardRepository;

  beforeEach(() => {
    createCardUseCase = new CreateCardUseCase(repositoryMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a new card with id', async () => {
    saveMock.mockResolvedValue(succeed());

    const result = await createCardUseCase.execute({
      conteudo: 'conteudo',
      titulo: 'titulo',
      lista: 'lista',
    });

    expect(isSuccess(result)).toBeTruthy();
    const card = result.data;
    expect(card?.id).toBeDefined();
    expect(card?.conteudo).toEqual('conteudo');
    expect(card?.titulo).toEqual('titulo');
    expect(card?.lista).toEqual('lista');
  });

  it('should return an error when the repository does so', async () => {
    const error = new BaseException('erro', 502);
    saveMock.mockResolvedValue(fail(error));

    const result = await createCardUseCase.execute({
      conteudo: 'conteudo',
      titulo: 'titulo',
      lista: 'lista',
    });

    expect(isFailure(result)).toBeTruthy();
    expect(result.error).toEqual(error);
  });
});
