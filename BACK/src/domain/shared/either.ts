import { BaseException } from '../../api/errors/base-exception';

type Failure<T> = {
  error: T;
  data?: never;
};

type Success<U> = {
  error?: never;
  data: U;
};

// @ts-expect-error success without a data return must be accepted
export const succeed = <L extends BaseException, R>(data: R = undefined): Either<L, R> => {
  return { data };
};

export const fail = <L extends BaseException, R>(error: L): Either<L, R> => {
  return { error };
};

export const isSuccess = <L extends BaseException, R>(
  either: Either<L, R>,
): either is Success<R> => {
  return !either.error;
};

export const isFailure = <L extends BaseException, R>(
  either: Either<L, R>,
): either is Failure<L> => {
  return !!either.error;
};

export const getEitherValue = <L extends BaseException, R>(either: Either<L, R>) => {
  if (isFailure(either)) {
    return either.error;
  }

  return either.data;
};

export type Either<L, R> = NonNullable<Failure<L> | Success<R>>;
