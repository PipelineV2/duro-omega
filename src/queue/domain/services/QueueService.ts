import { createSolutionBuilderHost } from 'typescript';
import { QueueRepository } from '../../infrastructure/QueueRepository';
import {Client} from '../models/Client';
import {Queue, QueueModel} from '../models/Queue';

export class QueueService {
  private queueRepository: QueueRepository;

  constructor(queueRepository: QueueRepository) {
    this.queueRepository = queueRepository;
  }

  async createQueue(name: string, hostId: string): Promise<Queue> {
    const queue: Queue = new QueueModel({
      name,
      hostId,
      clients: [],
      currentClient: null,
    });
    return queue.save();
  }

  async getQueue(queueId: string): Promise<Queue | null> {
    return this.queueRepository.findById(queueId);
  }

  async viewQueues(hostId: string): Promise<Queue[]> {
    return this.queueRepository.findByHostId(hostId);
  }

  async deleteQueue(queueId: string): Promise<boolean> {
    return this.queueRepository.delete(queueId);
  }

  async processClient(queueId: string): Promise<Queue | null> {
    const queue = await this.queueRepository.findById(queueId);
    if (!queue) {
      return null;
    }

    if (queue.clients.length === 0) {
      // No clients in the queue
      return queue;
    }

    // Process the current client
    queue.currentClient = queue.clients.shift()!;
    await this.queueRepository.update(queueId, queue);

    return queue;
  }

  async joinQueue(queueId: string, client: Client): Promise<Queue | null> {
    const queue = await this.queueRepository.findById(queueId);
    if (!queue) {
      return null;
    }

    queue.clients.push(client);
    await this.queueRepository.update(queueId, queue);

    return queue;
  }
  async getCurrentClient(queueId: string): Promise<Client | null> {
    const queue = await this.getQueue(queueId);
    if (!queue) {
      return null;
    }
    return queue.currentClient;
  }

  async getNextClient(queueId: string): Promise<Client | null> {
    const queue = await this.getQueue(queueId);
    if (!queue || queue.clients.length === 0) {
      return null;
    }
    return queue.clients[0];
  }

}
