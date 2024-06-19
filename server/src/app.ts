import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import taskRouter from "./api/tasks/tasks.router";
import bodyParser from "body-parser";
import connectMongoDB from "./configs/db.config";
import { CLIENT_URL } from "./configs/config";
import { handleResponseError } from "./middleware/errorHandler";

connectMongoDB();
const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", taskRouter);

// middleware for handle error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleResponseError(err, req, res);
});

export default app;
