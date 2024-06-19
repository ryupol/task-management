import winston, { transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { LOG_SAVE_LEVEL, BASE_PATH, APP_NAME } from "./config";

const { combine, json, timestamp } = winston.format;
const LOG_DIRECTORY = `${BASE_PATH}/logs`;

const defaultFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  json()
);

function generateWinstonRotateConfig(level: string) {
  let filename = `${LOG_DIRECTORY}/${APP_NAME}-%DATE%.log`;
  if (level === "error") {
    filename = `${LOG_DIRECTORY}/${APP_NAME}-error-%DATE%.log`;
  }

  return new DailyRotateFile({
    filename,
    datePattern: "YYYY-MM-DD",
    frequency: "1m", // 1 minute
    maxSize: "10m", // 10mb
    level,
  });
}

const fileTransports = [
  generateWinstonRotateConfig(LOG_SAVE_LEVEL),
  generateWinstonRotateConfig("error"),
];
const logger = winston.createLogger({
  level: LOG_SAVE_LEVEL,
  format: defaultFormat,
  defaultMeta: { service: APP_NAME },
  transports: [],
});

if (process.env.NODE_ENV !== "test") {
  fileTransports.forEach((t) => logger.add(t));
}

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: defaultFormat,
    })
  );
}

export default logger;
