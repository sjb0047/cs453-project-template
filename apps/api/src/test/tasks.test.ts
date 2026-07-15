import request from "supertest";
import { app } from "../app";
import { pool } from "../db/pool";


beforeEach(async () => {
	await pool.query("DELETE FROM tasks");
});

afterAll(async () => {
	await pool.end();
});

describe("Task API", () => {
	test("GET /tasks returns a list", async () => {
		const response = await request(app).get("/tasks");

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	test("POST /tasks creates a task", async () => {
		const response = await request(app).post("/tasks").send({
			title: "Create task API",
			status: "todo",
		});

		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({
			title: "Create task API",
			status: "todo",
		});
		expect(response.body.id).toBeDefined();
	});

	test("GET /tasks/:id returns one task", async () => {
		const created = await request(app).post("/tasks").send({
			title: "Read one task",
		});

		const response = await request(app).get(`/tasks/${created.body.id}`);

		expect(response.status).toBe(200);
		expect(response.body.title).toBe("Read one task");
	});

	test("PATCH /tasks/:id updates a task", async () => {
		const created = await request(app).post("/tasks").send({
			title: "Update task",
			status: "todo",
		});

		const response = await request(app)
			.patch(`/tasks/${created.body.id}`)
			.send({
				status: "done",
			});

		expect(response.status).toBe(200);
		expect(response.body.status).toBe("done");
	});

	test("DELETE /tasks/:id deletes a task", async () => {
		const created = await request(app).post("/tasks").send({
			title: "Delete task",
		});

		const response = await request(app).delete(`/tasks/${created.body.id}`);

		expect(response.status).toBe(204);

		const followUp = await request(app).get(`/tasks/${created.body.id}`);
		expect(followUp.status).toBe(404);
	});

	test("missing tasks return 404", async () => {
		const response = await request(app).get("/tasks/999999");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			error: "Task not found",
		});
	});

	test("creating a task without a title returns 400", async () => {
		const response = await request(app).post("/tasks").send({});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			error: "Title is required",
		});
	});
});