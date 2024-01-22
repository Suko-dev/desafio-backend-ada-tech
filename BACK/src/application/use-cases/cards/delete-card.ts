import { CardEntity } from '../../../domain/entities/card.entity';
import { Either, isFailure } from '../../../domain/shared/either';
import { BaseException } from '../../../api/errors/base-exception';
import { CardRepository } from '../../interfaces/card-repository';

export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(id: string): Promise<Either<BaseException, CardEntity[]>> {
    const deleteResult = await this.cardRepository.delete(id);

    if (isFailure(deleteResult)) {
      return deleteResult;
    }

    return await this.cardRepository.find();
  }
}
