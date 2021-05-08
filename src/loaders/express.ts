import bodyParser from 'body-parser';
import express, { Application } from 'express';

import { app_config } from '../config/app-config';
import { handleErrorMiddleware } from '../middlewares/error-handling';
import { router } from '../routes';
const fileUpload = require('express-fileupload');

export class ExpressLoader {
  server;
  constructor() {
    const app: Application = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(fileUpload());

    app.use(router);
    app.use(handleErrorMiddleware);
    this.server = app.listen(app_config.port, () => {
      console.log(`Server is listening on port ${app_config.port}`);
    });
  }
}
