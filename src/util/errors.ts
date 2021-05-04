import { CustomError } from 'ts-custom-error';
import { httpErrorStatusCodes } from '../constants/http-statuses';

export class HttpError extends CustomError {
  public constructor(public code: number, message?: string) {
    super(message);
  }
}

export class AppError extends CustomError {
  public code: number = httpErrorStatusCodes.INTERNAL;
  public constructor(message: string) {
    super(message);
  }
}
