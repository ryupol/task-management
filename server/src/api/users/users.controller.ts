import { Request, Response } from "express";
import logger from "../../configs/log.config";
import {
  createUserService,
  findUserByUsername,
  signToken,
  validateUser,
} from "./users.service";
import { JWT_OPTIONS, IS_PRODUCTION } from "../../configs/config";

// Register
export const register = async (req: Request, res: Response) => {
  const userDetail = req.body;
  logger.debug("Start register user");
  const newUser = await createUserService(userDetail);
  logger.debug("Done register user");
  return res.json(newUser);
};

// Login
// Onetime access token
// -> JWT (JSON Web Token)
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  logger.debug(`login username: ${username}`);
  const user = await validateUser(username, password);
  if (!user) {
    logger.debug(`Unvalidate user: ${username}`);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  logger.debug(`creating token for user: ${username}`);
  const token = await signToken(user);
  logger.debug(`Done login user: ${username}`);
  return res
    .cookie(JWT_OPTIONS.jwtCookieName, token, {
      httpOnly: true,
      secure: IS_PRODUCTION,
    })
    .json({ token });
};

export const getMe = async (req: any, res: Response) => {
  const user: any = await findUserByUsername(req.user.username);
  const { username, email, _id: id } = user;
  return res.json({ username, email, id });
};

export const logout = async (req: Request, res: Response) => {
  if (req.cookies[JWT_OPTIONS.jwtCookieName]) {
    res.clearCookie(JWT_OPTIONS.jwtCookieName).json({
      message: "You have logged out!",
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
