import { Task } from "./tasks.type";
import TaskModel from "./task.schema";
import logger from "../../configs/log.config";

export const getTasksService = async () => {
  const tasks = await TaskModel.find({}).exec();
  logger.debug({ tasks });
  return tasks;
};

export const createTaskService = async (task: Omit<Task, "id">) => {
  logger.debug({ task });
  const newTask = new TaskModel({
    title: task.title,
    status: task.status,
  });
  logger.debug({ newTask });
  const result = await newTask.save();
  logger.debug({ result });
  return result;
};

export const updateTaskService = async ({
  taskId,
  data,
}: {
  taskId: string | number;
  data: Omit<Task, "id">;
}) => {
  logger.debug({ taskId, data });
  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, data, {
    new: true,
  });
  if (!updatedTask) {
    logger.error(`TaskId: ${taskId} not found, cannot make the update`);
    throw new Error("NF_0001");
  }
  logger.info({ updatedTask });
  return updatedTask;
};

export const deleteTaskService = async ({
  taskId,
}: {
  taskId: string | number;
}) => {
  logger.debug({ taskId });
  const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  if (!deletedTask) {
    logger.error(`TaskId: ${taskId} not found, cannot delete`);
    throw new Error("NF_0001");
  }
  logger.info(`TaskId: ${taskId} deleted!`);
};
