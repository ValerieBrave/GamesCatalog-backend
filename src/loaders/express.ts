import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { app_config } from '../config/app-config';

export class ExpressLoader {
  server;
  constructor() {
    const app: Application = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    this.server = app.listen(app_config.port, () => {
      console.log(`Server is listening on port ${app_config.port}`);
    });
  }
}

