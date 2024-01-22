import { CardEntity } from '../../../domain/entities/card.entity';
import { Either } from '../../../domain/shared/either';
import { BaseException } from '../../../api/errors/base-exception';
import { CardRepository } from '../../interfaces/card-repository';

export class GetCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(): Promise<Either<BaseException, CardEntity[]>> {
    return await this.cardRepository.find();
  }
}
