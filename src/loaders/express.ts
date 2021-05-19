import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import { handleErrorMiddleware } from '../middlewares/error-handling';
import fileUpload from 'express-fileupload';
import { router } from '../routes';
import { app_config } from '../config/app-config';

export class ExpressLoader {
  server;
  constructor() {
    const app: Application = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(fileUpload());
    app.use(router);
	
	if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../public')))
      app.get('*', (req, res) => {
        res.sendFile( 'index.html', {root:`public`})
      })
    }
	
	
    app.use(handleErrorMiddleware);
    this.server = app.listen(app_config.port, () => {
      console.log(`Server is listening on port ${app_config.port}`);
    });
  }
}
