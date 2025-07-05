import {Router} from "express";
import { register, login, verifyToken, getUserData, updateProfile } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);
router.get("/user", authMiddleware, getUserData);
router.put("/profile", authMiddleware, updateProfile);

export default router;