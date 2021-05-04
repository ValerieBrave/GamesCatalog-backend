import { Request, Response } from 'express';
import { httpErrorStatusCodes } from '../constants/http-statuses';
import { UserService } from '../services/user-service';
import { HttpError } from '../util/errors';

export function roleCheckMiddleware(role: string) {
  return async function (req: Request, res: Response, next) {
    const userService = new UserService();
    try {
      const userRole = await userService.getUserRole(req.headers.authorization.split(' ')[1]);
      if (userRole != role) next(new HttpError(httpErrorStatusCodes.FORBIDDEN, 'You have no rights for this action'));
      else next();
    } catch (err) {
      next(err);
    }
  };
}
