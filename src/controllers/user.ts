import { Request, Response } from 'express';
import { ProfileService } from '../services/profile-service';
import { UserService } from '../services/user-service';
import { AppError } from '../util/errors';

class UserController {
  private userService: UserService;
  private profileService: ProfileService;

  constructor() {
    this.userService = new UserService();
    this.profileService = new ProfileService();
  }

  async delete(req: Request, res: Response, next) {
    const id: number = parseInt(req.params.id);
    try {
      await this.userService.deleteUser(id);
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    try {
      const info = await this.profileService.getProfile(token);
      res.status(200).json(info);
    } catch (err) {
      next(new AppError(err.message));
    }
  }

  async changePassword(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    try {
      await this.profileService.setNewPassword(token, req.body.oldPass, req.body.newPass, req.body.newPassConfirm);
      res.status(200).json({ message: 'Your password successfully updated' });
    } catch (err) {
      next(err);
    }
  }

  async changePersonalInfo(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    try {
      await this.profileService.setNewPersonalInfo(token, req.body.newName, req.body.newBD);
      res.status(200).json({ message: 'Your personal info was successfully updated' });
    } catch (err) {
      next(err);
    }
  }

  async changeAvatar(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    const data = req.files['avatar']['data'];
    try {
      const url = await this.profileService.setNewAvatar(token, data);
      res.status(200).json({ message: 'Your avatar successfully updated', url: url });
    } catch (err) {
      next(err);
    }
  }

  async getLikes(req: Request, res: Response, next) {
    const token = req.get('clienttoken').split(' ')[1];
    try {
      const likes = await this.profileService.getUserGames(token);
      res.status(200).json({ likes: likes });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
