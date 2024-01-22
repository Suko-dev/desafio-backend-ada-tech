import { CardEntity } from '../../../domain/entities/card.entity';
import { Either, isSuccess, succeed } from '../../../domain/shared/either';
import { BaseException } from '../../../api/errors/base-exception';
import { CreateCardDto } from '../../dtos/create-card.dto';
import { CardRepository } from '../../interfaces/card-repository';

export class CreateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(createCardDto: CreateCardDto): Promise<Either<BaseException, CardEntity>> {
    const card = new CardEntity(
      null,
      createCardDto.titulo,
      createCardDto.conteudo,
      createCardDto.lista,
    );
    const result = await this.cardRepository.save(card);

    if (isSuccess(result)) {
      return succeed(card);
    }

    return result;
  }
}
