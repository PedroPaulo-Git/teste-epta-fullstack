import { Request,Response} from 'express'
import { registerUser,loginUser} from '../services/authService'
import { AuthRequest } from '../middlewares/authMiddleware'


export const register = async (req:Request,res:Response)=>{
    try{
        const { name, email, password } = req.body; // Desestruturar para clareza
        if (!name || !email || !password) {
            res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
            return 
        }
        const user = await registerUser({ name, email, password });
        res.status(201).json(user)
    }catch(error:any){
        console.error("Erro no registro:", error.message);
        res.status(400).json({message:error.message})
    }
};

export const login = async (req:Request,res:Response)=>{
    try{
        const { email, password } = req.body; // Desestruturar para clareza
        if (!email || !password) {
            res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            return
        }
        const token = await loginUser({ email, password })
        res.status(200).json({token})
    }catch(error:any){
        console.error("Erro no login:", error.message);
        res.status(401).json({message:error.message || "Falha na autenticação. Verifique suas credenciais." })
    }
}

export const verifyToken = async (req: AuthRequest, res: Response) => {
    try {
        // O token foi validado com sucesso pelo middleware de autenticação
        res.status(200).json({ 
            message: "Token válido",
            user: {
                id: req.user?.id,
                email: req.user?.email
            }
        });
    } catch (error: any) {
        console.error("Erro na verificação do token:", error.message);
        res.status(401).json({ message: "Token inválido" });
    }
};