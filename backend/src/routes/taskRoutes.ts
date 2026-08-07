import express from "express";
import { createTask, getTaskById, getTasks } from "../controllers/taskController";
import { validateTask } from "../middlewares/validateTask";
const router = express.Router();
router.post("/", validateTask, createTask);
router.get("/",getTasks);
router.get("/:id",getTaskById);
export default router;