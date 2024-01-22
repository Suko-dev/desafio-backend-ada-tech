import { DataTypes, Model, Sequelize } from 'sequelize';
import Logger from '../application/utils/logger';

type Config = {
  DATABASE_CONNECTION: string;
};

export class CardModel extends Model {}

export class SequelizeClient {
  private static instance: SequelizeClient;
  public sequelize: Sequelize;

  private constructor(config: Config) {
    this.sequelize = new Sequelize(config.DATABASE_CONNECTION);

    CardModel.init(
      {
        id: { type: DataTypes.TEXT, primaryKey: true },
        titulo: DataTypes.TEXT,
        conteudo: DataTypes.TEXT,
        lista: DataTypes.TEXT,
      },
      { sequelize: this.sequelize, paranoid: true, modelName: 'cards' },
    );

    this.sequelize
      .authenticate()
      .then(() => CardModel.sync())
      .catch((e) => Logger.error(e));
  }

  static getInstance(config: Config) {
    if (!this.instance) {
      this.instance = new SequelizeClient(config);
    }

    return this.instance;
  }

  getCardModel() {
    return CardModel;
  }
}
