import express from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { validateTask } from "../middlewares/validateTask";
const router = express.Router();
router.post("/", validateTask, createTask);
router.get("/",getTasks)
export default router;