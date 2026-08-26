import express from "express" ;
import {
    register,
    login,
    getUsers,
    getMyProfile,
    updateMyProfile
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();
router.post("/register",register);
router.post("/login", login);
router.get("/users", authMiddleware, getUsers);
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
export default router;
