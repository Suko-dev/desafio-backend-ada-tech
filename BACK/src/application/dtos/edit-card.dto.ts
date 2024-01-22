import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditCardDto {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsNotEmpty()
  lista: string;

  constructor({ id, titulo, conteudo, lista }: EditCardDto) {
    this.id = id;
    this.lista = lista;
    this.conteudo = conteudo;
    this.titulo = titulo;
  }
}
