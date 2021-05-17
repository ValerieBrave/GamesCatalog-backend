import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user';


@Entity({ name: 'game' })
export class Game {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  rating: number;

  @Column({ type: 'date', nullable: true })
  release: Date;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  public constructor(id: number, name?: string, release?: number, rating?: number) {
    this.id = id;
    if (name) this.name = name;
    if (rating) this.rating = rating;
    if (release) this.release = new Date(release * 1000);
  }
}
