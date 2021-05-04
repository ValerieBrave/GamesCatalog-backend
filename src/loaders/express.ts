import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { app_config } from '../config/app-config';
import { handleErrorMiddleware } from '../middlewares/error-handling';
import { authRouter } from '../routes/auth';
import { userRouter } from '../routes/user';

export class ExpressLoader {
  server;
  constructor() {
    const app: Application = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(authRouter);
    app.use(userRouter);
    app.use(handleErrorMiddleware);
    this.server = app.listen(app_config.port, () => {
      console.log(`Server is listening on port ${app_config.port}`);
    });
  }
}
