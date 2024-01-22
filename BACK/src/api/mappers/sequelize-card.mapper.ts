import { CardModel } from '../../config/sequelize';
import { CardEntity } from '../../domain/entities/card.entity';

type Card = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
};

export class SequelizeCardMapper {
  static toEntity(cardModel: CardModel): CardEntity {
    const card = cardModel as unknown as Card;
    return new CardEntity(card.id, card.titulo, card.conteudo, card.lista);
  }

  static toManyEntities(cardModel: CardModel[]): CardEntity[] {
    return cardModel.map(this.toEntity);
  }

  static toModel(cardEntity: CardEntity) {
    return {
      id: cardEntity.id,
      titulo: cardEntity.titulo,
      lista: cardEntity.lista,
      conteudo: cardEntity.conteudo,
    };
  }
}
