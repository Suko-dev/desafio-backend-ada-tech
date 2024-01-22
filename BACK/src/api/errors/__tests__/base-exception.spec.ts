import { BaseException } from '../base-exception';

describe(`${BaseException.name}`, () => {
  describe(`${BaseException.prototype.toJson.name}`, () => {
    it('should return an defined object', () => {
      const exception = new BaseException('an error message', 400);

      const result = exception.toJson();

      expect(result).toEqual({
        statusCode: 400,
        errorMessage: 'an error message',
        details: '',
      });
    });
  });
});
