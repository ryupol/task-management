type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export { Task };
