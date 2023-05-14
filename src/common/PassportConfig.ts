import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../authentication/domain/models/User';
import dotenv from 'dotenv';
dotenv.config();

const configurePassport = () => {
  const userModel = new UserModel();

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '89809a7d78a3acb3a93fdd5a9c79205633316c39124e5ef7e26a5bb05905430d',
  };
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.sub);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  return passport;
}

const authenticateJwt = passport.authenticate('jwt', { session: false });
export {authenticateJwt, configurePassport};
