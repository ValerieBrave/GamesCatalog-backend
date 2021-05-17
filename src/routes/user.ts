import express from 'express';
import { UserRole } from '../constants/user-roles';
import { jwtCheckMiddleware } from '../middlewares/jwt-check';
import { roleCheckMiddleware } from '../middlewares/role-check';
import UserController from '../controllers/user';
import { newInfoRules, newPasswordRules, validate } from '../middlewares/request-validation';

export const userRouter = express.Router();

userRouter.get('/profile/liked', [jwtCheckMiddleware], UserController.getLikes);
userRouter.get('/profile', [jwtCheckMiddleware], UserController.get);
userRouter.put('/profile/password', [jwtCheckMiddleware], newPasswordRules(), validate, UserController.changePassword);
userRouter.put('/profile/info', [jwtCheckMiddleware], newInfoRules(), validate, UserController.changePersonalInfo);
userRouter.post('/profile/avatar', [jwtCheckMiddleware], UserController.changeAvatar);
userRouter.delete('/delete/:id', [jwtCheckMiddleware, roleCheckMiddleware(UserRole.ADMIN)], UserController.delete);
