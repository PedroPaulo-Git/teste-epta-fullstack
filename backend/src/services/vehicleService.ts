import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type VehicleStatus = "active" | "inactive";



//listar todos os veículos
export const listVehicles = async() =>{
    return prisma.vehicle.findMany();
}
//pegar veículo pelo id
export const getVehicleById = async (id: string) => {
  return prisma.vehicle.findUnique({
    where: { id: Number(id) },
  });
};

//criar veículo 
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
//mudar dados do veículo 
export const updateVehicle = async(id:string,data:{name?:string;plate?:string})=>{
    return prisma.vehicle.update({
        where:{id:Number(id)},
        data,
    });
};

//setar status do veículo
export const setVehicleStatus = async (id:string,status:VehicleStatus)=>{
  return prisma.vehicle.update({
    where: { id: Number(id) },
    data: { status:status },
  });
}
//deletar veículo 
export const deleteVehicle = async (id: string) => {
  return prisma.vehicle.delete({
    where: { id: Number(id) },
  });
};