import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authRouter } from './auth';
import { gameRouter } from './game';
import { userRouter } from './user';

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/v4', createProxyMiddleware({ target: 'https://api.igdb.com', changeOrigin: true }))
