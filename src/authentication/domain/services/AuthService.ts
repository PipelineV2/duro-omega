import { User } from '../models/User';
import { UserRepository } from '../../infrastructure/UserRepository';
import {EmailService} from '../../../common/EmailService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class AuthenticationService {
  private blacklist: Set<string>; // In-memory cache for blacklisted tokens

  private emailService!: EmailService;
  private secretKey: any = process.env.JWT_KEY;
  constructor(private userRepository: UserRepository) {
    this.blacklist = new Set<string>();
    if (process.env.SENDER_EMAIL) {
      this.emailService = new EmailService();
    }
  }

  public async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const newUser = {
      userId: uuidv4(),
      email: email,
      password: password,
      verified: false,
    } as User;

    const createdUser: any = await this.userRepository.create(newUser);

    // Send verification email
    const verificationToken = await this.generateVerificationToken(createdUser);
    await this.emailService.sendVerificationEmail(createdUser.email, verificationToken);

    return createdUser;
  }

  // Rest of the code...

  private async generateVerificationToken(user: User): Promise<string> {
    // Generate a unique verification token for the user
    // You can use a library like 'uuid' to generate the token or implement your own logic
    const code = uuidv4();
    // Update the user with the verification token
    user.verificationToken = code;
    await this.userRepository.save(user);

    return user.verificationToken;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey);
    return token;
  }

  public async logout(token: any): Promise<void> {
    // Add the token to the blacklist
    this.blacklist.add(token);
  }

  public async verifyToken(token: any): Promise<boolean> {
    // Check if the token is in the blacklist
    if (this.blacklist.has(token)) {
      return false; // Token is blacklisted
    }

    try {
      jwt.verify(token, this.secretKey);
      return true; // Token is valid
    } catch (err) {
      return false; // Token is invalid
    }
  }
}
