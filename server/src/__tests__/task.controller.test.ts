import request from "supertest";
import app from "../app";
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../api/tasks/tasks.service";

jest.mock("../api/tasks/tasks.service");

describe("Task Controller", () => {
  test("GET /api/tasks should return array of task", async () => {
    const mockTasks = [
      {
        _id: "666fccd2d9594fedc20cc368",
        title: "Test",
        status: "TODO",
        __v: 0,
      },
    ];
    (getTasksService as jest.Mock).mockReturnValue(mockTasks);
    const response = await request(app).get("/api/tasks");
    expect(response.status).toEqual(200);
    expect(response.body.data).toStrictEqual(mockTasks);
  });

  test("POST /api/tasks should create task", async () => {
    const mockTasks = {
      title: "NEWTASK",
      status: "TODO",
      _id: "66754c3114941f18276dbbf8",
      __v: 0,
    };
    (createTaskService as jest.Mock).mockReturnValue(mockTasks);

    const body = {
      title: "NEWTASK",
      status: "TODO",
    };
    const response = await request(app).post("/api/tasks").send(body);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual(mockTasks);
  });

  test("PATCH /api/tasks should update task", async () => {
    const taskId: string = "66754c3114941f18276dbbf8";
    const mockTasks = {
      title: "NEWTASK",
      status: "IN_PROGRESS",
      _id: taskId,
      __v: 0,
    };
    (updateTaskService as jest.Mock).mockReturnValue(mockTasks);

    const body = { status: "IN_PROGRESS" };
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(body);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual(mockTasks);
  });

  test("PATCH /api/tasks invalid id should return 404", async () => {
    const taskId: string = "invalidId";

    (updateTaskService as jest.Mock).mockImplementation(() => {
      throw new Error("NF_0001");
    });
    const body = { status: "IN_PROGRESS" };
    const response = await request(app).patch(`/${taskId}`).send(body);
    expect(response.status).toEqual(404);
  });

  test("DELETE /api/tasks should delete task", async () => {
    const taskId: string = "66754c3114941f18276dbbf8";
    (deleteTaskService as jest.Mock).mockReturnValue(null);

    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toEqual(204);
  });

  test("DELETE /api/tasks invalid id should return 404", async () => {
    const taskId: string = "invalidId";
    (deleteTaskService as jest.Mock).mockImplementation(() => {
      throw new Error("NF_0001");
    });
    const response = await request(app).delete(`/${taskId}`);
    expect(response.status).toEqual(404);
  });

  test("GET /invalid should return not found", async () => {
    const response = await request(app)
      .get("/invalid")
      .set("Accept", "application/json");
    expect(response.status).toEqual(404);
  });
});
