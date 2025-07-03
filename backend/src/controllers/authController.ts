import { Request,Response} from 'express'
import { registerUser,loginUser} from '../services/authService'


export const register = async (req:Request,res:Response)=>{
    try{
        const user = await registerUser(req.body);
        res.status(200).json(user)
    }catch(error:any){
         res.status(400).json({message:error.message})
    }
};

export const login = async (req:Request,res:Response)=>{
    try{
        const token = await loginUser(req.body)
         res.status(200).json({token})
    }catch(error:any){
       res.status(400).json({message:error.message})
    }
}