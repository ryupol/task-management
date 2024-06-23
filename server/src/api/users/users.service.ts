import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./users.schema";
import logger from "../../configs/log.config";
import { JWT_OPTIONS, SALT_ROUNDS } from "../../configs/config";
import { User } from "./users.type";

export const createUserService = async (userDetail: User) => {
  const { username, password, email } = userDetail;
  logger.debug(`Register username: ${username}`);
  const hashing = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new UserModel({
    username,
    password: hashing,
    email,
  });
  logger.debug({ newUser });
  const result = await newUser.save();
  logger.debug(`Register username: ${result.username} Successfully`);
  return { id: result._id, username: result.username };
};

export const findUserByUsername = async (username: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    logger.debug(`User: ${username} doesn't exists`);
    return null;
  }
  return user;
};

// HS256 -> Symmetric -> Same key or secret text
// RS256 -> Asymetric -> 2 keys -> private (sign) / public (varify)
export const signToken = async (user: { username: string }) => {
  const { username } = user;
  const token = jwt.sign({ sub: username }, JWT_OPTIONS.privateKey, {
    algorithm: JWT_OPTIONS.algorithm,
    expiresIn: "1h",
    issuer: JWT_OPTIONS.issuer,
  });
  logger.debug("create Token Successfully");
  return token;
};

export const validateUser = async (username: string, password: string) => {
  const user: any = await findUserByUsername(username);
  if (!user) {
    logger.debug(`User: ${username} doesn't exists`);
    return null;
  }
  const userStoredPassword = user.password;
  const isMatched = await bcrypt.compare(password, userStoredPassword);
  if (!isMatched) {
    logger.debug(`User: ${username} password incorrect`);
    return null;
  }
  return user;
};
