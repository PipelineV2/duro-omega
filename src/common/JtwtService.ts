import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ServiceProvider, ServiceProviderDoc } from '../ServiceProvider/ServiceProviderModel';
import jwt, { Secret } from 'jsonwebtoken';

class JwtService {
  private readonly jwtOptions: StrategyOptions;

  constructor() {
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    };
    this.initializePassport();
  }

  private initializePassport(): void {
    passport.use(
      new JwtStrategy(this.jwtOptions, (payload: any, done: VerifiedCallback) => {
        // Implement your custom logic to retrieve and validate the user from the payload
        // Call done(null, user) if the user is valid, or done(null, false) if not
        // You can also handle errors with done(error)
        // See the Passport.js documentation for more details
       try {
        const user = ServiceProvider.findOne({ email: payload.email });
        if (user) {
          done(null, user);
        }
        else{
          done(null, false);
        }
        done(null, user);
       } catch (error) {
        done(error);
       }
      })
    );
  }

  public authenticateJwt(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('jwt', { session: false })(req, res, next);
  }

  public generateAccessToken(user:ServiceProviderDoc): string {
    // Generate an access token based on the user data
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY as Secret, { expiresIn: '1h' });
    return token;
  }

  public generateRefreshToken(user: ServiceProviderDoc): string {
    // Generate a refresh token based on the user data
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY as Secret, { expiresIn: '7d' });
    return token;
  }

  public verifyToken(token: string): any {
    // Verify the token and extract the payload
    const payload = jwt.verify(token, process.env.JWT_KEY as Secret);
    return payload;
  }
}

export default new JwtService();
