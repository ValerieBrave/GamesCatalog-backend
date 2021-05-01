// const EntitySchema = require('typeorm').EntitySchema;

// module.exports = new EntitySchema({
//   name: 'User',
//   tableName: 'users',
//   columns: {
//     id: { primary: true, type: 'int', generated: true },
//     name: { type: 'varchar', nullable: false },
//     email: { type: 'varchar', unique: true },
//     avatar: { type: 'varchar' },
//     birthday: { type: 'date', nullable: false },
//     password: { type: 'varchar', nullable: false },
//     role: { type: 'varchar', nullable: false },
//   },

//   //
// });
export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

import { Entity, PrimaryGeneratedColumn, Column, Check, Unique } from "typeorm"
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email:string;

  @Column('varchar')
  avatar: string;

  @Column('date')
  birthday: Date;

  @Column('varchar')
  password: string;

  @Column({type:'enum', enum: UserRole, default: UserRole.USER})
  role: string;
}

