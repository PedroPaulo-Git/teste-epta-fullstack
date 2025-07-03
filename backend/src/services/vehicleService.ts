import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type VehicleStatus = "active" | "inactive";

export const listVehicles = async() =>{
    return prisma.vehicle.findMany();
}

export const createVehicle = async (data:{name:string;plate:string;userId:number})=>{
    return prisma.vehicle.create({
        data:{
            name:data.name,
            plate:data.plate,
            status:"active",
            userId: data.userId,
        },
    });
};

export const updateVehicle = async(id:string,data:{name?:string;plate?:string})=>{
    return prisma.vehicle.update({
        where:{id:Number(id)},
        data,
    });
};

export const setVehicleStatus = async (id:string,status:VehicleStatus)=>{
  return prisma.vehicle.update({
    where: { id: Number(id) },
    data: { status:status },
  });
}
export const deleteVehicle = async (id: string) => {
  return prisma.vehicle.delete({
    where: { id: Number(id) },
  });
};