import { getCustomRepository } from 'typeorm';
import { User } from '../entities/user';
import { UserRepository } from '../repository/user-repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../util/errors';

export class UserService {
  async isEmailTaken(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (user == undefined) return false;
    else return true;
  }

  async findUser(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findByEmail(email);
  }

  async passwordsMatch(providedPass: string, candidatePass: string): Promise<boolean> {
    return await bcrypt.compare(providedPass, candidatePass);
  }

  async setFreshToken(oldToken: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByToken(oldToken);
    if (user != undefined) {
      const newToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.TOKEN_SECRET
      );
      await userRepository.setNewToken(user.id, newToken);
      return newToken;
    } else throw new AppError("can't find user by provided token");
  }

  async getUserRole(token: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByToken(token);
    if (user != undefined) return user.role;
    else throw new AppError("can't find user by provided token");
  }

  async saveLoginToken(userId: number, token: string) {
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.setNewToken(userId, token);
  }

  async registerUser(user: User) {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.save(user);
  }
}
