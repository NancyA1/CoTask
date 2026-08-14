import express from "express";
import { getProjects, createProject , getProjectById, updateProjectById, deleteProjectById } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.get("/:id", authMiddleware, getProjectById
    
);
router.put("/:id", authMiddleware, updateProjectById);
router.delete("/:id", authMiddleware, deleteProjectById);
export default router;