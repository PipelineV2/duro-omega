import { Queue } from '../models/Queue';

export interface IQueueRepository {
  getQueue(queueId: string): Promise<Queue>;
  getAllQueues(): Promise<Queue[]>;
  createQueue(queue: Queue): Promise<Queue>;
  deleteQueue(queueId: string): Promise<void>;
  updateQueue(queueId: string, queue: Queue): Promise<Queue>;
  enqueueClient(queueId: string, clientId: string): Promise<void>;
  dequeueClient(queueId: string): Promise<string>;
  notifyNextClient(queueId: string): Promise<string>;
}
