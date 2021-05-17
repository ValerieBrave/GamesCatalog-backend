import { Request, Response } from 'express';
import { ProfileService } from '../services/profile-service';
import { UserService } from '../services/user-service';

class AuthController {
  async login(req: Request, res: Response, next) {
    const userService = new UserService();
    const profileService = new ProfileService();
    try {
      const token = await userService.loginUser(req.body.email, req.body.password);
      const likes = await profileService.getUserGames(token);
      res.status(200).json({ token: token, likes: likes });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next) {
    const userService = new UserService();
    try {
      await userService.registerUser(req.body.name, req.body.email, req.body.password);
      res.status(201).json({ message: 'You can log in now' });
    } catch (err) {
      next(err);
    }
  }
}
export default new AuthController();
