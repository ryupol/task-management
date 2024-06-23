import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import taskRouter from "./api/tasks/tasks.router";
import userRouter from "./api/users/users.router";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectMongoDB from "./configs/db.config";
import { CLIENT_URL } from "./configs/config";
import { handleResponseError } from "./middleware/errorHandler";
import "./configs/passport.config";

connectMongoDB();
const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

// middleware for handle error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleResponseError(err, req, res);
});

export default app;
