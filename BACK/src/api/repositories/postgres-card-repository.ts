import { CardRepository } from '../../application/interfaces/card-repository';
import { CardEntity } from '../../domain/entities/card.entity';
import { Either, fail, succeed } from '../../domain/shared/either';
import { BaseException } from '../errors/base-exception';
import { SequelizeClient } from '../../config/sequelize';
import Logger from '../../application/utils/logger';
import { NotFoundException } from '../errors/not-found-exception';
import { SequelizeCardMapper } from '../mappers/sequelize-card.mapper';

type DbConfig = {
  DATABASE_CONNECTION: string;
};

export class PostgresCardRepository implements CardRepository {
  private cardModel;

  constructor(config: DbConfig) {
    this.cardModel = SequelizeClient.getInstance(config).getCardModel();
  }

  async update(card: CardEntity): Promise<Either<NotFoundException, void>> {
    try {
      const cardModel = await this.cardModel.findOne({
        where: { id: card.id },
      });

      if (!cardModel) {
        return fail(new NotFoundException());
      }

      await cardModel.update(SequelizeCardMapper.toModel(card));
      return succeed();
    } catch (e) {
      Logger.log(e as Error);
      return fail(new BaseException('Erro ao conectar com o banco de dados', 502));
    }
  }

  async delete(id: string): Promise<Either<BaseException, void>> {
    try {
      const result = await this.cardModel.destroy({ where: { id } });
      if (!result) {
        return fail(new NotFoundException());
      }
    } catch (e) {
      Logger.log(e as Error);
      return fail(new BaseException('Erro ao conectar com o banco de dados', 502));
    }
    return succeed();
  }

  async find(): Promise<Either<BaseException, CardEntity[]>> {
    try {
      const sequelizeCards = await this.cardModel.findAll();
      const cards = SequelizeCardMapper.toManyEntities(sequelizeCards);
      return succeed(cards);
    } catch (e) {
      Logger.log(e as Error);
      return fail(new BaseException('Erro ao conectar com o banco de dados', 502));
    }
  }

  async save(card: CardEntity): Promise<Either<BaseException, void>> {
    try {
      await this.cardModel.create(SequelizeCardMapper.toModel(card));
      return succeed();
    } catch (e) {
      Logger.log(e as Error);
      return fail(new BaseException('Erro ao conectar com o banco de dados', 502));
    }
  }
}
