import express from 'express';
import { UserRole } from '../constants/user-roles';
import { jwtCheckMiddleware } from '../middlewares/jwt-check';
import { roleCheckMiddleware } from '../middlewares/role-check';
import UserController from '../controllers/user';
import { newBirthdayRules, newNameRules, newPasswordRules, validate } from '../middlewares/request-validation';

export const userRouter = express.Router();

userRouter.get('/profile/:id', UserController.get);
userRouter.put('/profile/password', [jwtCheckMiddleware], newPasswordRules(), validate, UserController.changePassword);
userRouter.put('/profile/name', [jwtCheckMiddleware], newNameRules(), validate, UserController.changeName);
userRouter.put('/profile/birthday', [jwtCheckMiddleware], newBirthdayRules(), validate, UserController.changeBirthday);
userRouter.post('/profile/avatar', [jwtCheckMiddleware], UserController.changeAvatar);
userRouter.delete('/delete/:id', [jwtCheckMiddleware, roleCheckMiddleware(UserRole.ADMIN)], UserController.delete);
