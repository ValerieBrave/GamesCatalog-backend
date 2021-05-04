import express, { Request, Response } from 'express';
import { jwtCheckMiddleware } from '../middlewares/jwt-check';
import { roleCheckMiddleware } from '../middlewares/role-check';

export const userRouter = express.Router();

userRouter.delete('/user/:id', [jwtCheckMiddleware, roleCheckMiddleware('admin')], (req: Request, res: Response) => {
  res.status(200).json({ message: 'checking jwtMiddleware + roleMiddleware' });
});
