import { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { httpErrorStatusCodes } from '../constants/http-statuses';
import { HttpError } from '../util/errors';

export function loginRules() {
  return [body('email').not().isEmpty().bail().isEmail(), body('password').not().isEmpty().bail().isLength({ min: 6 })];
}

export function registerRules() {
  return [
    body('name').not().isEmpty().bail().isString(),
    body('email').not().isEmpty().bail().isEmail(),
    body('password').not().isEmpty().bail().isLength({ min: 6 }),
  ];
}

export function newPasswordRules() {
  return [
    body('oldPass').not().isEmpty().bail().isLength({ min: 6 }),
    body('newPass').not().isEmpty().bail().isLength({ min: 6 }),
    body('newPassConfirm').not().isEmpty().bail().isLength({ min: 6 }),
  ];
}

export function newInfoRules() {
  return [
    body('newName').not().isEmpty().bail().isString(),
    body('newBD')
      .not()
      .isEmpty()
      .bail()
      .custom((value: string) => {
        //mySQL date format check
        const reg = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');
        if (!value.match(reg)) throw new HttpError(httpErrorStatusCodes.BAD_REQUEST, 'Date is of wrong format');
        return true;
      }),
  ];
}

export function validate(req: Request, res: Response, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let messages = '';
  errors.array().map((err) => (messages += `${err.param} : ${err.msg}; `));

  next(new HttpError(httpErrorStatusCodes.BAD_REQUEST, messages));
}
