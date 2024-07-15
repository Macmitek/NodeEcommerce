import express, { Application } from 'express';
import { config } from 'dotenv';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { userRouter } from '../routes/userRouter';
import { productRouter } from '../routes/productRouter';


dotenv.config();
export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.init();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  
  private init(): void {
    const ENV_FILE = path.join(__dirname, '..', '.env');
    config({ path: ENV_FILE });

    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(bodyParser.json());
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api/users', new userRouter().router);
    this.app.use('/api/products', new productRouter().router);
  }

  public start() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server is running at :`,port);
    });
  }
}
