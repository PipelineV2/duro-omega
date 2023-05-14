import { User } from '../models/User';
import { MongoClient, Collection } from 'mongodb';

export class UserRepository {
  private collection: Collection<User>;

  constructor(dbClient: MongoClient) {
    this.collection = dbClient.db().collection('users');
  }

  public async create(user: User): Promise<void> {
    await this.collection.insertOne(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.collection.findOne({ email });
  }

  public async findById(id: string): Promise<User | null> {
    return this.collection.findOne({ id });
  }
}
