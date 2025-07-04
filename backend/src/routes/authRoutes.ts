import {Router} from "express";
import { register, login,verifyToken} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verifyToken);

export default router;