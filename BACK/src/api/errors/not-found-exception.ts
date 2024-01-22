import { BaseException } from './base-exception';

export class NotFoundException extends BaseException {
  constructor() {
    super('Not found', 404);
  }
}
