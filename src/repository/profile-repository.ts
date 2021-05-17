import { EntityManager, EntityRepository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
export class ProfileRepository {
  private alias: string;
  constructor(private manager: EntityManager) {
    this.alias = 'user';
  }

  async getProfileInfo(token: string) {
    return await this.manager
      .createQueryBuilder()
      .select(['user.id', 'user.avatar', 'user.name', 'user.email', 'user.birthday'])
      .from(User, this.alias)
      .where('user.token = :token', { token: token })
      .getOne();
  }

  async updatePassword(userId: number, newPass: string) {
    return await this.manager
      .createQueryBuilder()
      .update(User)
      .set({ password: newPass })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateName(userId: number, newName: string) {
    return await this.manager
      .createQueryBuilder()
      .update(User)
      .set({ name: newName })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateBirthday(userId: number, newBD: string) {
    //format yyyy-mm-dd
    return await this.manager
      .createQueryBuilder()
      .update(User)
      .set({ birthday: newBD })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateAvatar(userId: number, link: string) {
    return await this.manager
      .createQueryBuilder()
      .update(User)
      .set({ avatar: link })
      .where('id = :id', { id: userId })
      .execute();
  }
}
