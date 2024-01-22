import { v4 as Uuid } from 'uuid';

export class CardEntity {
  readonly id: string;

  constructor(
    id: string | null,
    public titulo: string,
    public conteudo: string,
    public lista: string,
  ) {
    this.id = id || Uuid();
  }
}
