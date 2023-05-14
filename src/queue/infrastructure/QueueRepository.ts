import { Model } from 'mongoose';
import { Client } from '../domain/models/Client';
import { Queue } from '../domain/models/Queue';
export class QueueRepository {
  private queueModel: Model<Queue>;

  constructor(queueModel: Model<Queue>) {
    this.queueModel = queueModel;
  }

  async create(queue: Queue): Promise<Queue> {
    return this.queueModel.create(queue);
  }

  async findById(queueId: string): Promise<Queue | null> {
    return this.queueModel.findById(queueId);
  }

  async findByHostId(hostId: string): Promise<Queue[]> {
    return this.queueModel.find({ hostId });
  }

  async update(queueId: string, updatedQueue: Queue): Promise<Queue | null> {
    return this.queueModel.findByIdAndUpdate(queueId, updatedQueue, { new: true });
  }

  async delete(queueId: string): Promise<boolean> {
    const result = await this.queueModel.deleteOne({ _id: queueId });
    return result.deletedCount === 1;
  }

  async getCurrentClient(queueId: string): Promise<Client | null> {
    const queue = await this.queueModel.findById(queueId).populate('currentClient');
    return queue?.currentClient || null;
  }

  async getNextClient(queueId: string): Promise<Client | null> {
    const queue = await this.queueModel.findById(queueId).populate('clients');
    return queue?.clients[0] || null;
  }

  // Add other queue-related database operations as needed
}
