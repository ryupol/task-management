import express from "express";
import { schemaValidator } from "../../middleware/validator";
import { createTaskSchema, updateTaskSchema } from "./task.validator";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./tasks.controller";

const router = express.Router();

router.get("/", getTasks);
router.post("/", schemaValidator(createTaskSchema), createTask);
router.patch("/:id", schemaValidator(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
