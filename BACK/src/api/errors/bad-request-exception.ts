import { BaseException } from './base-exception';

export class BadRequestException extends BaseException {
  constructor() {
    super('Bad Request', 400);
  }
}
