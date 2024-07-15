import { ConnectDb } from '../common/mongoconfig';
import UserModel, { UserDocument } from '../models/userModel';

export class UserService {
  private db: ConnectDb;

  constructor() {
    this.db = ConnectDb.getInstance();
  }
  public async register(user: any): Promise<UserDocument> {
    try {
      await this.db.connect();
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public async getUsers(): Promise<UserDocument[]> {
    try {
      await this.db.connect();
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(id: string): Promise<UserDocument | null> {
    try {
      await this.db.connect();
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(id: string, updatedData: any): Promise<UserDocument | null> {
    try {
      await this.db.connect();
      const user = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: string): Promise<UserDocument | null> {
    try {
      await this.db.connect();
      const user = await UserModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
