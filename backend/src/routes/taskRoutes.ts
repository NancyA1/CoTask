import express from "express";
import { createTask } from "../controllers/taskController";
import { validateTask } from "../middlewares/validateTask";
const router = express.Router();
router.post("/", validateTask, createTask);
export default router;