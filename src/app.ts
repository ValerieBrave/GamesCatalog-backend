import 'reflect-metadata';
import { getConnectionManager } from 'typeorm';
import { db_config } from './/config/app-config';
import { ExpressLoader } from './/loaders/express';

const connectionManager = getConnectionManager();
const connection = connectionManager.create(db_config);

connection
  .connect()
  .then(async (con) => {
    new ExpressLoader();
  })
  .catch((err) => {
    console.log(err);
  });
