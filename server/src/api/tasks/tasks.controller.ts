import { NextFunction, Request, Response } from "express";
import { Task } from "./tasks.type";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "./tasks.service";
import logger from "../../configs/log.config";

export const getTasks = async (req: Request, res: Response) => {
  logger.debug("Start get tasks");
  const data = await getTasksService();
  logger.debug("Done get tasks");
  return res.json({ data });
};

export const createTask = async (req: Request, res: Response) => {
  logger.debug("Start create task");
  const task: Task = req.body;
  const data = await createTaskService(task);
  logger.debug("Done create task");
  return res.json(data);
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug("Start update task");
  const { id: taskId } = req.params;
  const updateData: Task = req.body;
  try {
    const data = await updateTaskService({ taskId, data: updateData });
    logger.debug("Done update task");
    return res.json(data);
  } catch (error: any) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.debug("Start delete task");
  const { id: taskId } = req.params;
  try {
    await deleteTaskService({ taskId });
    logger.debug("Done delete task");
    return res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};
