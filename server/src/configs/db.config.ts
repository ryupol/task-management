import mongoose from "mongoose";
import { MONGO_DB_URL } from "./config";
import logger from "./log.config";

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_DB_URL);
    logger.info("Connect MongoDB successful");
  } catch (error: any) {
    logger.error(error);
  }
}

export default connectMongoDB;
