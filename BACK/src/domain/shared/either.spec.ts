import { Either, fail, getEitherValue, isFailure, isSuccess, succeed } from './either';
import { BaseException } from '../../api/errors/base-exception';

describe('Either', () => {
  const error = new BaseException('', 0);

  describe('isSuccess', () => {
    it('should return true when a either is success with data', () => {
      const either = { data: 'some data' };

      const result = isSuccess(either);

      expect(result).toBeTruthy();
    });

    it('should return true when a either is success without', () => {
      const either = {} as Either<any, any>;

      const result = isSuccess(either);

      expect(result).toBeTruthy();
    });

    it('should return false when a either is success', () => {
      const either = { error: new BaseException('', 0) };

      const result = isSuccess(either);

      expect(result).toBeFalsy();
    });
  });

  describe('isFailure', () => {
    it('should return false when a either is success', () => {
      const either = { data: 'some data' };

      const result = isFailure(either);

      expect(result).toBeFalsy();
    });

    it('should return true when a either is success', () => {
      const either = { error: new BaseException('', 0) };

      const result = isFailure(either);

      expect(result).toBeTruthy();
    });
  });

  describe('getEitherValue', () => {
    it('should return the data when a either is success', () => {
      const either = { data: 'some data' };

      const result = getEitherValue(either);

      expect(result).toEqual('some data');
    });

    it('should return the error when a either is success', () => {
      const either = { error };

      const result = getEitherValue(either);

      expect(result).toEqual(error);
    });
  });

  describe('succeed', () => {
    it('should generate a success with data', () => {
      const data = 'some data';

      const either = succeed(data);

      expect(either.data).toEqual(data);
      expect(either.error).toBeUndefined();
    });

    it('should generate a success without data', () => {
      const either = succeed();

      expect(isSuccess(either)).toBeTruthy();
      expect(either.error).toBeUndefined();
    });
  });

  describe('fail', () => {
    it('should generate a failure', () => {
      const either = fail(error);

      expect(either.data).toBeUndefined();
      expect(either.error).toEqual(error);
    });
  });
});
