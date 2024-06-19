import { Request, Response } from "express";
import logger from "../configs/log.config";

export const handleResponseError = (
  error: any,
  req: Request,
  res: Response
) => {
  const response = {
    errorCode: "ER_0001",
    message: "Something went wrong",
  };
  switch (error.message) {
    case "NF_0001":
      response.errorCode = "NF_0001";
      response.message = "Task not found";
      break;
    default:
      console.log(error.message);
  }
  return res.status(500).json(response);
};
