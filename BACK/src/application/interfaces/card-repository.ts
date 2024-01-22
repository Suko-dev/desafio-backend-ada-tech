import { Either } from '../../domain/shared/either';
import { CardEntity } from '../../domain/entities/card.entity';
import { BaseException } from '../../api/errors/base-exception';
import { NotFoundException } from '../../api/errors/not-found-exception';

export interface CardRepository {
  save: (card: CardEntity) => Promise<Either<BaseException, void>>;
  delete: (id: string) => Promise<Either<BaseException, void>>;
  find: () => Promise<Either<BaseException, CardEntity[]>>;
  update: (card: CardEntity) => Promise<Either<NotFoundException, void>>;
}
