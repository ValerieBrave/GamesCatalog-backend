import { Request, Response } from 'express';
import { GameService } from '../services/game-service';
import { AppError } from '../util/errors';

class GameController {
  private gameService: GameService;
  constructor() {
    this.gameService = new GameService();
  }
  async like(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    const gameId: number = parseInt(req.params.id);
    try {
      const liked = await this.gameService.like(gameId, token);
      res.status(200).json({ liked: liked });
    } catch (err) {
      if (!err.code) next(new AppError(err.message));
    }
  }
}

export default new GameController();
