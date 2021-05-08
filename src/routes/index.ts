import express from 'express';
import { authRouter } from './auth';
import { userRouter } from './user';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
