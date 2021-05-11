import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError, HttpError } from '../util/errors';
import { jwt_config } from '../config/app-config';
import { httpErrorStatusCodes } from '../constants/http-statuses';
import { UserRole } from '../constants/user-roles';
import { User } from '../entities/user';
import { UserRepository } from '../repository/user-repository';

export class UserService {
  private userRepository: UserRepository;

  public constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  private async isEmailTaken(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user == undefined) return false;
    else return true;
  }

  async findUser(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async passwordsMatch(providedPass: string, candidatePass: string): Promise<boolean> {
    return await bcrypt.compare(providedPass, candidatePass);
  }

  async setFreshToken(oldToken: string) {
    const user = await this.userRepository.findByToken(oldToken);
    if (user != undefined) {
      const newToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        jwt_config.secret
      );
      await this.userRepository.setNewToken(user.id, newToken);
      return newToken;
    } else throw new AppError("Can't find user by provided token");
  }

  async getUserRole(token: string) {
    const user = await this.userRepository.findByToken(token);
    if (user != undefined) return user.role;
    else throw new AppError("Can't find user by provided token");
  }

  private async saveLoginToken(userId: number, token: string) {
    await this.userRepository.setNewToken(userId, token);
  }

  async registerUser(name: string, email: string, password: string) {
    if (await this.isEmailTaken(email)) throw new HttpError(httpErrorStatusCodes.CONFLICT, 'Email is already taken');
    let candidate: User = new User(name, email);
    await candidate.hashPassword(password);
    candidate.role = UserRole.USER;
    return await this.userRepository.save(candidate);
  }

  async loginUser(providedEmail: string, providedPass: string) {
    const candidate = await this.findUser(providedEmail);
    if (candidate) {
      if (await this.passwordsMatch(providedPass, candidate.password)) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate.id,
          },
          jwt_config.secret
        );
        await this.saveLoginToken(candidate.id, token);
        return token;
      } else throw new HttpError(httpErrorStatusCodes.UNAUTHORIZED, 'Wrong password');
    } else throw new HttpError(httpErrorStatusCodes.FORBIDDEN, "User doesn't exist");
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'User not found');
    if (user.role == UserRole.ADMIN) throw new HttpError(httpErrorStatusCodes.FORBIDDEN, "You can't delete admin user");
    else {
      try {
        await this.userRepository.delete(userId);
      } catch (err) {
        throw new AppError('Failed to delete this user');
      }
    }
  }
}
