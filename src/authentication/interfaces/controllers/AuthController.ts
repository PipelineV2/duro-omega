import { Request, Response } from 'express';
import { AuthenticationService } from '../../domain/services/AuthService';
import { CustomError } from '../../../common/Error';
import passport from 'passport';

export class AuthController {
  constructor(private authService: AuthenticationService) {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      await this.authService.logout(token);
      if (!token) {
        throw new Error('Token not provided');
      }
      res.sendStatus(204);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const isValid = await this.authService.verifyToken(token);
      res.status(200).json({ isValid });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
