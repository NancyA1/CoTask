import express from "express";
import { createTask, deleteTaskById, getTaskById, getTasks, updateTaskById } from "../controllers/taskController";
import { validateTask } from "../middlewares/validateTask";

const router = express.Router();
router.post("/", validateTask, createTask);
router.get("/",getTasks);
router.get("/:id",getTaskById);
router.put("/:id",validateTask,updateTaskById);
router.delete("/:id",deleteTaskById);
export default router;