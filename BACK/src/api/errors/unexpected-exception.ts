import { BaseException } from './base-exception';

export class UnexpectedException extends BaseException {
  constructor() {
    super('Something went wrong', 500);
  }
}
