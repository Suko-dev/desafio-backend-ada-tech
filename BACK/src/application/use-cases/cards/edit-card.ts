import { CardEntity } from '../../../domain/entities/card.entity';
import { Either, isSuccess, succeed } from '../../../domain/shared/either';
import { BaseException } from '../../../api/errors/base-exception';
import { CardRepository } from '../../interfaces/card-repository';
import { EditCardDto } from '../../dtos/edit-card.dto';

export class EditCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(editCardDto: EditCardDto): Promise<Either<BaseException, CardEntity>> {
    const card = new CardEntity(
      editCardDto.id,
      editCardDto.titulo,
      editCardDto.conteudo,
      editCardDto.lista,
    );

    const result = await this.cardRepository.update(card);

    if (isSuccess(result)) {
      return succeed(card);
    }

    return result;
  }
}
