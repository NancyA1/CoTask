import express from "express";
import { addMember } from "../controllers/projectMemberController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:id/members", authMiddleware, addMember);

export default router;