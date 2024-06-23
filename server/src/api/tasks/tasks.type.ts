export interface Task {
  id?: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}
