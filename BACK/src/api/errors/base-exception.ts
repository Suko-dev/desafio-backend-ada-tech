export class BaseException extends Error {
  public code: number;
  public details:
    | string
    | Record<string, unknown>
    | Array<string>
    | Array<Record<string, unknown>> = '';
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  toJson() {
    return {
      statusCode: this.code,
      errorMessage: this.message,
      details: this.details,
    };
  }
}
