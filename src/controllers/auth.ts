import { Request, Response } from 'express';
import { ProfileService } from '../services/profile-service';
import { UserService } from '../services/user-service';

class AuthController {
  private userService: UserService;
  private profileService: ProfileService;

  constructor() {
    this.userService = new UserService();
    this.profileService = new ProfileService();
  }
  async login(req: Request, res: Response, next) {
    try {
      const token = await this.userService.loginUser(req.body.email, req.body.password);
      const likes = await this.profileService.getUserGames(token);
      res.status(200).json({ token: token, likes: likes });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next) {
    try {
      await this.userService.registerUser(req.body.name, req.body.email, req.body.password);
      res.status(201).json({ message: 'You can log in now' });
    } catch (err) {
      next(err);
    }
  }
}
export default new AuthController();
