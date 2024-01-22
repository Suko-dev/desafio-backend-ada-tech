import { CardRepository } from '../../../interfaces/card-repository';
import { fail, isFailure, isSuccess, succeed } from '../../../../domain/shared/either';
import { EditCardUseCase } from '../edit-card';
import { NotFoundException } from '../../../../api/errors/not-found-exception';

describe(`${EditCardUseCase.name}`, () => {
  let editCardUseCase: EditCardUseCase;
  const updateMock = jest.fn();
  let repositoryMock: CardRepository = {
    update: updateMock,
  } as unknown as CardRepository;

  beforeEach(() => {
    editCardUseCase = new EditCardUseCase(repositoryMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the updated card', async () => {
    updateMock.mockResolvedValue(succeed());

    const result = await editCardUseCase.execute({
      id: '1',
      conteudo: 'conteudo atualizado',
      titulo: 'titulo',
      lista: 'lista',
    });

    expect(isSuccess(result)).toBeTruthy();
    const card = result.data;
    expect(card?.id).toBeDefined();
    expect(card?.conteudo).toEqual('conteudo atualizado');
    expect(card?.titulo).toEqual('titulo');
    expect(card?.lista).toEqual('lista');
  });

  it('should return an error when the repository does so', async () => {
    const error = new NotFoundException();
    updateMock.mockResolvedValue(fail(error));

    const result = await editCardUseCase.execute({
      id: '1',
      conteudo: 'conteudo',
      titulo: 'titulo',
      lista: 'lista',
    });

    expect(isFailure(result)).toBeTruthy();
    expect(result.error).toEqual(error);
  });
});
