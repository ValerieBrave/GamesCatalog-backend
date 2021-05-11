import express from 'express';
import GameController from '../controllers/game';
import { jwtCheckMiddleware } from '../middlewares/jwt-check';

export const gameRouter = express.Router();

gameRouter.post('/like/:id',[jwtCheckMiddleware], GameController.like)