import request from 'supertest';
import {app} from '../src/app';

describe('Auth API', () => {
  it('should create a new user and return a success message', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/v1/auth/signup').send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: true,
      message: 'Successfully signed up. Please check your email for verification.',
    });
  });

  it('should return an error if user already exists', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/v1/auth/signup').send(userData);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      status: false,
      message: 'User already exists',
    });
  });
});
