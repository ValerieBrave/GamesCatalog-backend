import { Request, Response } from 'express';
import { GameService } from '../services/game-service';
import { AppError } from '../util/errors';

class GameController {
    async like(req: Request, res: Response, next) {
        const token = req.headers.authorization.split(' ')[1];
        const gameId: number = parseInt(req.params.id);
        const gameService = new GameService();
        try {
            const liked = await gameService.like(gameId, token)
            res.status(200).json({liked: liked});
        } catch(err) {
            if(!err.code) next(new AppError(err.message));
        }
    }
}

export default new GameController()