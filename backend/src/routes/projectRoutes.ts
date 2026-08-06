import express from "express";
import { getProjects, createProject , getProjectById, updateProjectById } from "../controllers/projectController";


const router = express.Router();

router.get("/", getProjects);
router.post("/",createProject);
router.get("/:id", getProjectById);
router.put("/:id",updateProjectById);

export default router;