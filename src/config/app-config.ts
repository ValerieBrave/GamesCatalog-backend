import { ConnectionOptions } from 'typeorm';
import { User } from "../entities/user";
import { Game } from "../entities/game";


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
  entities: [User, Game],
};

export const jwt_config = {
  secret: process.env.TOKEN_SECRET,
};

export const cloud_config = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: parseInt(process.env.CLOUD_API_KEY),
  api_secret: process.env.CLOUD_API_SECRET,
};

export const api_config = {
  api_url: process.env.API_URL,
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_SECRET,
    "Authorization": `Bearer ${process.env.TWITCH_APP_TOKEN}`,
  },
};
