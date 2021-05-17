import { Entity, PrimaryGeneratedColumn, Column, Unique, JoinTable, ManyToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserRole } from '../constants/user-roles';
import { Game } from './game';

@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string;

  @Column({ nullable: true, type: 'date' })
  birthday: Date;

  @Column('varchar')
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  token: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @ManyToMany(() => Game, (game) => game.users, { cascade: true })
  @JoinTable()
  games: Game[];

  public constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}
