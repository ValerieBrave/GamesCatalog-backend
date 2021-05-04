import { httpErrorStatusCodes } from '../constants/http-statuses';
import { User } from '../entities/user';
import { UserService } from '../services/user-service';
import { AppError, HttpError } from '../util/errors';
import { Request, Response } from 'express';
import { UserRole } from '../constants/user-roles';
import jwt from 'jsonwebtoken';

class AuthController {
  async login(req: Request, res: Response, next) {
    const userService = new UserService();
    const candidate = await userService.findUser(req.body.email);
    if (candidate) {
      if (await userService.passwordsMatch(req.body.password, candidate.password)) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate.id,
          },
          process.env.TOKEN_SECRET
        );
        await userService.saveLoginToken(candidate.id, token);
        res.status(200).json({ token: token });
      } else {
        next(new HttpError(httpErrorStatusCodes.UNAUTHORIZED, 'Wrong password'));
      }
    } else {
      next(new HttpError(httpErrorStatusCodes.FORBIDDEN, "User doesn't exist"));
    }
  }

  async register(req: Request, res: Response, next) {
    const userService = new UserService();
    if (await userService.isEmailTaken(req.body['email']))
      next(new HttpError(httpErrorStatusCodes.CONFLICT, 'Email is already taken'));
    else {
      let candidate: User = new User(req.body.name, req.body.email);
      await candidate.hashPassword(req.body.password);
      candidate.role = UserRole.USER;
      try {
        await userService.registerUser(candidate);
        res.status(201).json({ message: 'You can log in now' });
      } catch (err) {
        next(new AppError(err.message));
      }
    }
  }
}
export default new AuthController();
