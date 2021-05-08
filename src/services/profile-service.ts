import { getCustomRepository } from 'typeorm';
import { httpErrorStatusCodes } from '../constants/http-statuses';
import { ProfileRepository } from '../repository/profile-repository';
import { UserRepository } from '../repository/user-repository';
import { AppError, HttpError } from '../util/errors';
import { UserService } from './user-service';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

import { cloud_config } from '../config/app-config';

export class ProfileService {
  private profileRepository: ProfileRepository;
  private userRepository: UserRepository;
  public constructor() {
    this.profileRepository = getCustomRepository(ProfileRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  async getProfile(userId: number) {
    const info = await this.profileRepository.getProfileInfo(userId);
    if (info) return info;
    else throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'User profile not found');
  }

  async setNewPassword(token: string, oldPass: string, newPass: string) {
    const userService = new UserService();
    let user = await this.userRepository.findByToken(token);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'Cant find user by provided token');
    if (!(await userService.passwordsMatch(oldPass, user.password)))
      throw new HttpError(httpErrorStatusCodes.FORBIDDEN, "Passwords don't match");
    await user.hashPassword(newPass);
    await this.profileRepository.updatePassword(user.id, user.password);
  }

  async setNewName(token: string, newname: string) {
    const userService = new UserService();
    let user = await this.userRepository.findByToken(token);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'Cant find user by provided token');
    await this.profileRepository.updateName(user.id, newname);
  }

  async setNewBirthday(token: string, newBD: string) {
    let user = await this.userRepository.findByToken(token);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'Cant find user by provided token');
    await this.profileRepository.updateBirthday(user.id, newBD);
  }


  async setNewAvatar(token: string, data) {
    let user = await this.userRepository.findByToken(token);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'Cant find user by provided token');
    try {
      cloudinary.v2.config(cloud_config);
      const stream = cloudinary.v2.uploader.upload_stream(async (error, result) => {
        if (error) throw new AppError('Failed to upload file');
        await this.profileRepository.updateAvatar(user.id, result.url);
        // return result.url
      });
      streamifier.createReadStream(data).pipe(stream);
    } catch (err) {
      throw err;
    }
  }
}
