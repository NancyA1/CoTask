import express from "express";
import { assignUserToTask } from "../controllers/taskAssignmentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:id/assign", authMiddleware, assignUserToTask);

export default router;