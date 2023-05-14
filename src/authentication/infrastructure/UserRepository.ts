import { Model, Document } from 'mongoose';
import { User, UserModel } from '../domain/models/User';

export class UserRepository {
  constructor(private userModel: Model<User>) {}

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? user.toObject() : null;
  }

  public async create(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser.toObject();
  }

  public async save(user: User): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(user.id, user, { new: true }).exec();
    return updatedUser ? updatedUser.toObject() : null;
  }
}

