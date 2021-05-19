import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import { api_config } from '../config/app-config';
import { GameRepository } from '../repository/game-repository';
import { UserRepository } from '../repository/user-repository';
import { Game } from '../entities/game';

export class GameService {
  private gameRepository: GameRepository;
  private userRepository: UserRepository;
  public constructor() {
    this.gameRepository = getCustomRepository(GameRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  public async getGameInfo(gameId: number) {
    return await axios({
      url: api_config.api_url,
      method: 'POST',
      headers: api_config.headers,
      data: `fields name, first_release_date, rating; where id=${gameId};`,
    });
  }

  async like(gameId: number, token: string) {
    const user = await this.userRepository.findByToken(token);
    
    const game = await this.gameRepository.findOne(gameId);
    console.log('after find game in DB, game = ', game)
    let liked: boolean;
    if (game) {
      //liked => dislike
      if (user.games.find((e) => e.id == game.id)) {
        user.games = user.games.filter((e) => e.id != game.id);
        liked = false;
      } else {
        // not liked => like
        user.games.push(game);
        liked = true;
      }
      this.userRepository.save(user);
    } else {
      // not in database yet - definitely like
      const gameInfo = (await this.getGameInfo(gameId)).data[0];
      console.log('after getting game info, info = ', gameInfo)
      const game = new Game(gameInfo.id, gameInfo.name, gameInfo.first_release_date, gameInfo.rating);
      game.users = [user];
      await this.gameRepository.save(game);
      liked = true;
    }
    console.log('before return, liked = ', liked)
    return liked;
  }
}
