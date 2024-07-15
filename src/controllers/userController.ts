import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userService.register(req.body);
      res.status(201).json({
        status: 'success',
        message: 'User has been registered successfully!',
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      console.log("inside get users!!")
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: 'User not found!' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.updateUser(id, req.body);

      if (!user) {
        res.status(404).json({ message: 'User not found!' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.deleteUser(id);

      if (!user) {
        res.status(404).json({ message: 'User not found!' });
      }

      res.status(200).json({ message: 'User has been deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
