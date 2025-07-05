import {Router} from "express";
import { register, login, verifyToken, getUserData } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);
router.get("/user", authMiddleware, getUserData);

export default router;