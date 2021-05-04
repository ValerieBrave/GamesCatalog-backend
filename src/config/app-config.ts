import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/user';
import dotenv from 'dotenv';

dotenv.config();

export const app_config = {
  port: process.env.PORT || process.env.APP_PORT,
};

export const db_config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
};
