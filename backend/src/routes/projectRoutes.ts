import express from "express";
import { getProjects, createProject , getProjectById, updateProjectById, deleteProjectById } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.get("/:id", getProjectById);
router.put("/:id",updateProjectById);
router.delete("/:id",deleteProjectById)

export default router;