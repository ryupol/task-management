import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../api/tasks/tasks.service";
import TaskModel from "../api/tasks/tasks.schema";
import { Task } from "../api/tasks/tasks.type";

jest.mock("../api/tasks/task.schema");

describe("Task Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should get all tasks", async () => {
    // Given
    const mockResponse = {
      _id: "666fccd2d9594fedc20cc368",
      title: "Test",
      status: "TODO",
      __v: 0,
    };
    (TaskModel.find as jest.Mock).mockReturnValue({
      exec: jest.fn().mockReturnValue(mockResponse),
    });
    // When
    const result = await getTasksService();
    // Then
    expect(result).toStrictEqual(mockResponse);
  });

  test("should create task", async () => {
    // Given
    const mockResponse = {
      _id: "666fccd2d9594fedc20cc368",
      title: "Test",
      status: "TODO",
      __v: 0,
    };
    (TaskModel as unknown as jest.Mock).mockImplementation(() => ({
      save: jest.fn().mockReturnValue(mockResponse),
    }));
    // When
    const body: Omit<Task, "id"> = {
      title: "Test",
      status: "TODO",
    };
    const result = await createTaskService(body);
    // Then
    expect(result).toBeTruthy();
    expect(result._id).toBe("666fccd2d9594fedc20cc368");
    expect(result.title).toBe("Test");
    expect(result.status).toBe("TODO");
  });

  test("should update task", async () => {
    // Given
    const mockResponse = {
      _id: "666fccd2d9594fedc20cc368",
      title: "Testing",
      status: "IN_PROGRESS",
      __v: 0,
    };
    (TaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue(mockResponse);
    // When
    const taskId: string = mockResponse._id;
    const data: Omit<Task, "id"> = {
      title: "Testing",
      status: "IN_PROGRESS",
    };
    const result = await updateTaskService({ taskId, data });
    // Then
    expect(result).toBeTruthy();
    expect(result._id).toBe(mockResponse._id);
    expect(result.title).toBe(data.title);
    expect(result.status).toBe(data.status);
  });

  test("should fail to update task", async () => {
    // Given
    (TaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue(null);
    // When
    const taskId: string = "wrongId";
    const data: Omit<Task, "id"> = {
      title: "Testing",
      status: "IN_PROGRESS",
    };
    const result = async () => await updateTaskService({ taskId, data });
    // Then
    expect(result).rejects.toThrow("NF_0001");
  });

  test("should delete task", async () => {
    // Given
    const mockResponse = {
      _id: "666fccd2d9594fedc20cc368",
      title: "Testing",
      status: "IN_PROGRESS",
      __v: 0,
    };
    (TaskModel.findByIdAndDelete as jest.Mock).mockReturnValue(mockResponse);
    // When
    const taskId: string = "666fccd2d9594fedc20cc368";
    const result = await deleteTaskService({ taskId });
    // Then
    expect(() => result).not.toThrow();
  });

  test("should fail to delete task", async () => {
    // Given
    (TaskModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    // When
    const taskId: string = "wrongId";
    const result = async () => await deleteTaskService({ taskId });
    // Then
    expect(result).rejects.toThrow("NF_0001");
  });
});
