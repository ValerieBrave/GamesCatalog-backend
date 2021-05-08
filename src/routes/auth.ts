import express from 'express';
import AuthController from '../controllers/auth';
import { loginRules, registerRules, validate } from '../middlewares/request-validation';

export const authRouter = express.Router();

authRouter.post('/register', registerRules(), validate, AuthController.register);
authRouter.post('/login', loginRules(), validate, AuthController.login);
