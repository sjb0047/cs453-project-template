import { Router } from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	getTaskById,
	updateTask,
} from "../services/taskService";

export const taskRouter = Router();

taskRouter.get("/", async (_req, res) => {
	try {
		const tasks = await getAllTasks();
		res.json(tasks);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);

		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

taskRouter.post("/", async (req, res) => {
	const { title, description = null, status = "todo" } = req.body;

	if (typeof title !== "string" || title.trim() === "") {
		return res.status(400).json({
			error: "Title is required",
		});
	}

	if (description !== null && typeof description !== "string") {
		return res.status(400).json({
			error: "Description must be a string",
		});
	}

	if (typeof status !== "string" || status.trim() === "") {
		return res.status(400).json({
			error: "Status must be a string",
		});
	}

	try {
		const task = await createTask(
			title.trim(),
			description?.trim() || null,
			status.trim(),
		);

		return res.status(201).json(task);
	} catch (error) {
		console.error("Failed to create task:", error);

		return res.status(500).json({
			error: "Failed to create task",
		});
	}
});

taskRouter.get("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({
			error: "Invalid task ID",
		});
	}

	try {
		const task = await getTaskById(id);

		if (!task) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		return res.json(task);
	} catch (error) {
		console.error("Failed to fetch task:", error);

		return res.status(500).json({
			error: "Failed to fetch task",
		});
	}
});

taskRouter.patch("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({
			error: "Invalid task ID",
		});
	}

	const { title, description, status } = req.body;

	if (title === undefined && description === undefined && status === undefined) {
		return res.status(400).json({
			error: "At least one field is required",
		});
	}

	if (
		title !== undefined &&
		(typeof title !== "string" || title.trim() === "")
	) {
		return res.status(400).json({
			error: "Title must be a non-empty string",
		});
	}

	if (
		description !== undefined &&
		description !== null &&
		typeof description !== "string"
	) {
		return res.status(400).json({
			error: "Description must be a string or null",
		});
	}

	if (
		status !== undefined &&
		(typeof status !== "string" || status.trim() === "")
	) {
		return res.status(400).json({
			error: "Status must be a non-empty string",
		});
	}

	try {
		const task = await updateTask(
			id,
			title?.trim(),
			typeof description === "string" ? description.trim() : description,
			status?.trim(),
		);

		if (!task) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		return res.json(task);
	} catch (error) {
		console.error("Failed to update task:", error);

		return res.status(500).json({
			error: "Failed to update task",
		});
	}
});

taskRouter.delete("/:id", async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id) || id <= 0) {
		return res.status(400).json({
			error: "Invalid task ID",
		});
	}

	try {
		const deleted = await deleteTask(id);

		if (!deleted) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		return res.status(204).send();
	} catch (error) {
		console.error("Failed to delete task:", error);

		return res.status(500).json({
			error: "Failed to delete task",
		});
	}
});