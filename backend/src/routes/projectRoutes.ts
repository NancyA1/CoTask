import express from "express";
import { getProjects, createProject , getProjectById } from "../controllers/projectController";


const router = express.Router();

router.get("/", getProjects);
router.post("/",createProject);
router.get("/:id", getProjectById);

export default router;