import express from 'express';
import { UserController } from '../controllers/userController';

//import { AuthMiddleware } from '../common/auth';

export class userRouter {
  public router: express.Router;
  private userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.userController.createUser.bind(this.userController));
    this.router.get('/', this.userController.getUsers.bind(this.userController));
    this.router.get('/:id', this.userController.getUserById.bind(this.userController));
    this.router.put('/:id', this.userController.updateUser.bind(this.userController));
    this.router.delete('/:id', this.userController.deleteUser.bind(this.userController));
  }
}
