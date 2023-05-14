import { Request, Response } from 'express';
import { QueueService } from '../../domain/services/QueueService';
import { Client, ClientModel } from '../../domain/models/Client';
import { Queue } from '../../domain/models/Queue';

export class QueueController {
  private queueService: QueueService;

  constructor(queueService: QueueService) {
    this.queueService = queueService;
  }

  async createQueue(req: Request, res: Response) {
    const { name, hostId } = req.body;
    try {
      const queue = await this.queueService.createQueue(name, hostId);
      res.status(201).json(queue);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create queue' });
    }
  }

  async getQueue(req: Request, res: Response) {
    const { queueId } = req.params;
    try {
      const queue = await this.queueService.getQueue(queueId);
      if (queue) {
        res.json(queue);
      } else {
        res.status(404).json({ error: 'Queue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve queue' });
    }
  }

  async viewQueues(req: Request, res: Response) {
    const { hostId } = req.query;
    try {
      const queues = await this.queueService.viewQueues(hostId as string);
      res.json(queues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve queues' });
    }
  }

  async deleteQueue(req: Request, res: Response) {
    const { queueId } = req.params;
    try {
      const success = await this.queueService.deleteQueue(queueId);
      if (success) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Queue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete queue' });
    }
  }

  async processClient(req: Request, res: Response) {
    const { queueId } = req.params;
    try {
      const queue = await this.queueService.processClient(queueId);
      if (queue) {
        res.json(queue);
      } else {
        res.status(404).json({ error: 'Queue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to process client' });
    }
  }

  async joinQueue(req: Request, res: Response) {
    const { queueId } = req.params;
    const { name, email, message } = req.body;
    const client: Client = { name, email, message } as Client;
    try {
      const queue = await this.queueService.joinQueue(queueId, client);
      if (queue) {
        res.json(queue);
      } else {
        res.status(404).json({ error: 'Queue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to join queue' });
    }
  }

  async displayQueue(req: Request, res: Response) {
    const { queueId } = req.params;
    try {
      const queue = await this.queueService.getQueue(queueId);
      if (queue) {
        const currentClient = await this.queueService.getCurrentClient(queueId);
        const nextClient = await this.queueService.getNextClient(queueId);
        res.json({ queue, currentClient, nextClient });
      }else {
        res.status(404).json({ error: 'Queue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve queue' });
    }
  }

}