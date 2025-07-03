import { Router } from "express";
import {
  getVehicleById,
  getVehicles,
  createVehicle,
  updateVehicle,
  archiveVehicle,
  restoreVehicle,
  deleteVehicle,
} from "../controllers/vehicleController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware); // precisa de autenticação

router.get("/vehicles/:id",getVehicleById);
router.get("/vehicles", getVehicles);
router.post("/vehicles", createVehicle);
router.put("/vehicles/:id", updateVehicle);
router.patch("/vehicles/:id/archive", archiveVehicle);
router.patch("/vehicles/:id/restore", restoreVehicle);
router.delete("/vehicles/:id", deleteVehicle);

export default router;
