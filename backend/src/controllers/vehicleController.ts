import { Request,Response } from "express";
import * as vehicleService from '../services/vehicleService';
import { AuthRequest } from "../middlewares/authMiddleware";
import { vehicleSchema } from "../schemas/vehicleSchema";


export const getVehicleById = async(req:Request,res:Response)=>{
      try{
        const vehicle = await vehicleService.getVehicleById(req.params.id);
        if(!vehicle){
            res.status(404).json({success:false,message:"Veículo não encontrado"})
        }
        res.status(200).json(vehicle)
    }catch(error:any){
        res.status(500).json({message:error.message})
    }
}
export const getVehicles = async(req:Request,res:Response)=>{
    try{
        const vehicle = await vehicleService.listVehicles();
        res.status(200).json(vehicle)
    }catch(error:any){
        res.status(500).json({message:error.message})
    }
}
 
export const createVehicle = async(req:AuthRequest,res:Response)=>{
    try {
        const data = vehicleSchema.parse(req.body);
        const vehicle = await vehicleService.createVehicle({
         ...data,
         userId: req.user!.id,
        });
        res.status(201).json(vehicle)
    } catch (error:any) {
        if(error.name === "ZodError"){
            res.status(400).json({ errors: error.errors })
        }
        res.status(500).json({message:error.message})
    }
}

export const updateVehicle = async(req:Request,res:Response)=>{
    try {
        const updatedVehicle = await vehicleService.updateVehicle(req.params.id,req.body)
        res.status(200).json(updatedVehicle)
    } catch (error:any) {
        res.status(400).json({message:error.message})
    }
}

export const archiveVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (!vehicle) {
      res.status(404).json({ message: "Veículo não encontrado" });
      return
    }

    if (vehicle.status === "inactive") {
      res.status(200).json({ message: "Veículo já está inativo", vehicle });
      return
    }
    const updatedVehicle = await vehicleService.setVehicleStatus(req.params.id, "inactive");
    res.status(200).json(updatedVehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const restoreVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await vehicleService.setVehicleStatus(req.params.id, "active");
    res.status(200).json(vehicle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};