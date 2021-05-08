import express from 'express';
import { UserRole } from '../constants/user-roles';
import { jwtCheckMiddleware } from '../middlewares/jwt-check';
import { roleCheckMiddleware } from '../middlewares/role-check';
import UserController from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/profile/:id', UserController.get);
userRouter.put('/profile/password', [jwtCheckMiddleware], UserController.changePassword);
userRouter.put('/profile/name', [jwtCheckMiddleware], UserController.changeName);
userRouter.put('/profile/birthday', [jwtCheckMiddleware], UserController.changeBirthday);
userRouter.post('/profile/avatar', [jwtCheckMiddleware], UserController.changeAvatar);
userRouter.delete('/delete/:id', [jwtCheckMiddleware, roleCheckMiddleware(UserRole.ADMIN)], UserController.delete);
