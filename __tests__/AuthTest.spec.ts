import { Request, Response, NextFunction } from 'express';
import AuthService from '../src/Auth/AuthService';
import { ServiceProvider } from '../src/ServiceProvider/ServiceProviderModel';

describe('AuthService', () => {
  afterEach(async () => {
    // Clean up any created users after each test
    await ServiceProvider.deleteMany({});
  });

  describe('signup', () => {
    it('should create a new user and return a success message', async () => {
        const req: Request = {
            body: {
              name: 'Khalid Wonderman',
              email: 'wonderman@duro.io',
              password: 'password123!',
            },
          } as Request;
      const res:  Response<any, Record<string, any>> = { status: jest.fn().mockReturnThis(), json: jest.fn(), };
      const next = jest.fn();

      await AuthService.signup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: 'Successfully signed up. Please check your email for verification.',
      });

      const createdUser = await ServiceProvider.findOne({ email: req.body.email });
      expect(createdUser).toBeDefined();
      expect(createdUser?.email).toBe(req.body.email);
    });

    it('should return a 409 status if user already exists', async () => {
      const existingUser = new ServiceProvider({ email: 'test@example.com', password: 'test123' });
      await existingUser.save();

      const req = { body: { email: 'test@example.com', password: 'test456' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await AuthService.signup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: false,
        message: 'User already exists',
      });
    });
  });

  // Write more tests for other methods of AuthService

});
