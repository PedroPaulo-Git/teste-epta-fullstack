import {Router} from "express";
import { register, login, verifyToken, getUserData, updateProfile } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validationMiddleware";
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/authSchemas";

const router = Router();

// Rotas com validação Zod
router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.put("/profile", authMiddleware, validateRequest(updateProfileSchema), updateProfile);

// Rotas protegidas sem validação adicional
router.get("/verify", authMiddleware, verifyToken);
router.get("/user", authMiddleware, getUserData);

export default router;