import { httpErrorStatusCodes } from '../constants/http-statuses';
import { HttpError } from '../util/errors';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user-service';
import { Request, Response } from 'express';
import { jwt_config } from '../config/app-config';

export function jwtCheckMiddleware(req: Request, res: Response, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwt_config.secret, async (err, user) => {
      if (err) next(new HttpError(httpErrorStatusCodes.FORBIDDEN, 'access denied'));
      try {
        const userService = new UserService();
        const fresh = await userService.setFreshToken(token);
        req.headers.authorization = `Bearer ${fresh}`;
        next();
      } catch (err) {
        next(err);
      }
    });
  } else {
    next(new HttpError(httpErrorStatusCodes.UNAUTHORIZED, 'not authenticated'));
  }
}
