import dotenv from "dotenv";
dotenv.config();

const ENV = process.env.NODE_ENV || "dev";
const IS_PRODUCTION = process.env.ENV === "production";

const APP_NAME = "task-management";

const PORT = process.env.PORT || 8080;

const MONGO_USER = process.env.MONGO_USER || "ryuguild";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "ryuguild123";
const MONGO_DOMAIN = process.env.MONGO_DOMAIN || "cluster0.5whunrf.mongodb.net";
const DB_NAME = process.env.DB_NAME || "task_management";

const MONGO_DB_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const LOG_SAVE_LEVEL = process.env.LOG_SAVE_LEVEL || "debug";

const BASE_PATH = process.cwd();

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const JWT_OPTIONS: {
  algorithm: "HS256" | "RS256";
  issuer: string;
  privateKey: any;
  publicKey: any;
  jwtCookieName: string;
} = {
  algorithm: "RS256",
  issuer: "ryupol",
  privateKey: process.env.PRIVATE_KEY_BASE64 || "private",
  publicKey: process.env.PRIVATE_KEY_BASE64 || "public",
  jwtCookieName: "access_token",
};
JWT_OPTIONS.privateKey = Buffer.from(JWT_OPTIONS.privateKey, "base64");
JWT_OPTIONS.publicKey = Buffer.from(JWT_OPTIONS.publicKey, "base64");

export {
  IS_PRODUCTION,
  PORT,
  MONGO_DB_URL,
  CLIENT_URL,
  LOG_SAVE_LEVEL,
  BASE_PATH,
  APP_NAME,
  SALT_ROUNDS,
  JWT_OPTIONS,
};
