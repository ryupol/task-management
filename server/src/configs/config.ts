const APP_NAME = "task-management";
const ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.PORT || 8080;

const MONGO_USER = process.env.MONGO_USER || "ryuguild";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "ryuguild123";
const MONGO_DOMAIN = process.env.MONGO_DOMAIN || "cluster0.5whunrf.mongodb.net";
const DB_NAME = process.env.DB_NAME || "task_management";

const MONGO_DB_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const LOG_SAVE_LEVEL = process.env.LOG_SAVE_LEVEL || "debug";

const BASE_PATH = process.cwd();

export { PORT, MONGO_DB_URL, CLIENT_URL, LOG_SAVE_LEVEL, BASE_PATH, APP_NAME };
