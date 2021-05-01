import {db_config} from './/config/app-config'
import { ExpressLoader } from './/loaders/express';
import { getConnectionManager } from 'typeorm';

const connectionManager = getConnectionManager();
const connection = connectionManager.create(db_config);

connection
  .connect()
  .then((con) => {
    new ExpressLoader();
  })
  .catch((err) => {
    console.log(err);
  });
