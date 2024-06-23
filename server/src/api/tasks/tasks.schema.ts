import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, require: true },
  status: { type: String, require: true },
});

const Task = mongoose.model("tasks", taskSchema);

export default Task;
