import { Request, Response } from 'express';
import { ProfileService } from '../services/profile-service';
import { UserService } from '../services/user-service';
import { AppError } from '../util/errors';

class UserController {
  async delete(req: Request, res: Response, next) {
    const id: number = parseInt(req.params.id);
    const userService = new UserService();
    try {
      await userService.deleteUser(id);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next) {
    const id: number = parseInt(req.params.id);
    const profileService = new ProfileService();
    try {
      const info = await profileService.getProfile(id);
      res.status(200).json(info);
    } catch (err) {
      next(new AppError(err.message));
    }
  }

  async changePassword(req: Request, res: Response, next) {
    const token = req.headers.authorization.split(' ')[1];
    const profileService = new ProfileService();
    try {
      await profileService.setNewPassword(token, req.body.oldPass, req.body.newPass, req.body.newPassConfirm);
      res.status(200).json({ message: 'Your password successfully updated' });
    } catch (err) {
      next(err);
    }
  }

  async changePersonalInfo(req: Request, res: Response, next) {
    const token = req.headers.authorization.split(' ')[1];
    const profileService = new ProfileService();
    try {
      await profileService.setNewPersonalInfo(token, req.body.newName, req.body.newBD);
      res.status(200).json({message: 'Your personal info was successfully updated'});
    } catch(err) {
      next(err);
    }
  }

  async changeAvatar(req: Request, res: Response, next) {
    const token = req.headers.authorization.split(' ')[1];
    const data = req.files['avatar']['data'];
    const profileService = new ProfileService();
    try {
      const url =await profileService.setNewAvatar(token, data);
      res.status(200).json({ message: 'Your avatar successfully updated', url: url });
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
