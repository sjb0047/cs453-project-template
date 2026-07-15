import express from "express";
import { pool } from "./db/pool";
import { taskRouter } from "./routes/taskRoutes";

export const app = express();

app.use(express.json());
app.use("/tasks", taskRouter);

app.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		service: "cs453-api",
	});
});

app.get("/db-health", async (_req, res) => {
	try {
		const result = await pool.query("SELECT NOW() AS current_time");

		res.json({
			status: "ok",
			database: "connected",
			currentTime: result.rows[0].current_time,
		});
	} catch (error) {
		console.error("Database health check failed:", error);

		res.status(500).json({
			status: "error",
			database: "disconnected",
		});
	}
});
