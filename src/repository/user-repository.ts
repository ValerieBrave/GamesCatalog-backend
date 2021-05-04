import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByToken(token: string) {
    return this.createQueryBuilder('user').where('user.token = :token', { token: token }).getOne();
  }

  findByEmail(email: string) {
    return this.createQueryBuilder('user').where('user.email = :email', { email: email }).getOne();
  }

  setNewToken(userId: number, newToken: string) {
    return this.createQueryBuilder('user')
      .update(User)
      .set({ token: newToken })
      .where('id = :id', { id: userId })
      .execute();
  }
}
