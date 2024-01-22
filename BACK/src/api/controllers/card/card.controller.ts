import { NextFunction, Request, Response } from 'express';
import { validateSync } from 'class-validator';
import { PostgresCardRepository } from '../../repositories/postgres-card-repository';
import { CreateCardUseCase } from '../../../application/use-cases/cards/create-card';
import { CreateCardDto } from '../../../application/dtos/create-card.dto';
import { BadRequestException } from '../../errors/bad-request-exception';
import { isSuccess } from '../../../domain/shared/either';
import { DeleteCardUseCase } from '../../../application/use-cases/cards/delete-card';
import { EditCardUseCase } from '../../../application/use-cases/cards/edit-card';
import { EditCardDto } from '../../../application/dtos/edit-card.dto';
import { GetCardUseCase } from '../../../application/use-cases/cards/get-cards';
import { config } from '../../../config/environment-variables';

export class CardController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const createCardUseCase = new CreateCardUseCase(new PostgresCardRepository(config));

    const createCardDto = new CreateCardDto(req.body);

    const errors = validateSync(createCardDto);

    if (errors.length) {
      return next(new BadRequestException());
    }

    const result = await createCardUseCase.execute(createCardDto);

    if (isSuccess(result)) {
      const card = result.data;
      return res.status(201).send(card);
    }

    next(result.error);
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    const getCardUseCase = new GetCardUseCase(new PostgresCardRepository(config));

    const result = await getCardUseCase.execute();

    if (isSuccess(result)) {
      const cards = result.data;
      return res.status(200).send(cards);
    }

    next(result.error);
  }

  static async put(req: Request, res: Response, next: NextFunction) {
    const editCardUseCase = new EditCardUseCase(new PostgresCardRepository(config));

    const editCardDto = new EditCardDto(req.body);
    const errors = validateSync(editCardDto);

    const cardId = req.params.id;

    if (errors.length || cardId !== req.body.id) {
      return next(new BadRequestException());
    }

    const result = await editCardUseCase.execute(editCardDto);

    if (isSuccess(result)) {
      const card = result.data;
      return res.status(200).send(card);
    }

    next(result.error);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const deleteCardUseCase = new DeleteCardUseCase(new PostgresCardRepository(config));

    const result = await deleteCardUseCase.execute(req.params.id);

    if (isSuccess(result)) {
      const cards = result.data;

      return res.status(200).send(cards);
    }

    next(result.error);
  }
}
