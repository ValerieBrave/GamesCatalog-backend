import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { jwt_config } from '../config/app-config';
import { httpErrorStatusCodes } from '../constants/http-statuses';
import { HttpError } from '../util/errors';
import { header } from 'express-validator';

export function jwtCheckMiddleware(req: Request, res: Response, next) {
  const authHeader = req.get('clienttoken');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwt_config.secret, async (err, user) => {
      if (err) next(new HttpError(httpErrorStatusCodes.FORBIDDEN, 'invalid token - access denied'));
      try {
        const userService = new UserService();
        const fresh = await userService.setFreshToken(token);
        req.headers.clienttoken = `Bearer ${fresh}`;
        res.set({
          'access-control-expose-headers': 'clienttoken',
        });
        res.setHeader('clienttoken', fresh);
        next();
      } catch (err) {
        next(err);
      }
    });
  } else {
    next(new HttpError(httpErrorStatusCodes.UNAUTHORIZED, 'not authenticated'));
  }
}
