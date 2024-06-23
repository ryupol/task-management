import { Request } from "express";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../api/users/users.schema";
import { JWT_OPTIONS } from "./config";
import logger from "./log.config";

function cookieExtractor(req: Request) {
  logger.debug("Extracting cookie");
  let token = null;
  console.log(req.cookies);
  if (req && req.cookies) {
    token = req.cookies[JWT_OPTIONS.jwtCookieName];
  }
  logger.debug(`Got token: ${token}`);
  return token;
}

const opts: any = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_OPTIONS.publicKey,
  issuer: JWT_OPTIONS.issuer,
  algorithms: JWT_OPTIONS.algorithm,
};

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    logger.debug(`jwtStrategy is finding user: ${jwt_payload.sub}`);
    const user = await UserModel.findOne({ username: jwt_payload.sub });
    if (user) {
      logger.debug(`jwtStrategy found user ${user.username}`);
      return done(null, user);
    } else {
      logger.debug(`jwtStrategy not found user`);
      return done(null, false);
    }
  } catch (error) {
    logger.error(`jwtStrategy got Error`);
    return done(error, false);
  }
});

passport.use(strategy);
