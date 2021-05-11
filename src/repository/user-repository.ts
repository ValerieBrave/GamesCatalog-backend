import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private alias: string;

  public constructor() {
    super();
    this.alias = 'user';
  }

  findByToken(token: string) {
    return this.createQueryBuilder(this.alias)
    .leftJoinAndSelect("user.games", "game")
    .where('user.token = :token', { token: token }).getOne();
  }

  findByEmail(email: string) {
    return this.createQueryBuilder(this.alias).where('user.email = :email', { email: email }).getOne();
  }

  setNewToken(userId: number, newToken: string) {
    return this.createQueryBuilder(this.alias)
      .update(User)
      .set({ token: newToken })
      .where('id = :id', { id: userId })
      .execute();
  }
}
