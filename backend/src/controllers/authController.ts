import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//controller pra registrar-se
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body; // Desestruturar para clareza
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Nome, e-mail e senha são obrigatórios." });
      return;
    }
    const user = await registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    console.error("Erro no registro:", error.message);
    res.status(400).json({ message: error.message });
  }
};
//controller pra login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; // Desestruturar para clareza
    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      return;
    }
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    res
      .status(401)
      .json({
        message:
          error.message || "Falha na autenticação. Verifique suas credenciais.",
      });
  }
};
//controller pra verificar token
export const verifyToken = async (req: AuthRequest, res: Response) => {
  try {
    // O token foi validado com sucesso pelo middleware de autenticação
    res.status(200).json({
      message: "Token válido",
      user: {
        id: req.user?.id,
        email: req.user?.email,
      },
    });
  } catch (error: any) {
    console.error("Erro na verificação do token:", error.message);
    res.status(401).json({ message: "Token inválido" });
  }
};
//controller pra pegar infos do usuário
export const getUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Erro ao buscar dados do usuário:", error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

//controller pra atualizar perfil do usuário
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    if (!name || name.trim().length === 0) {
      res.status(400).json({ message: "Nome é obrigatório" });
      return;
    }

    if (name.trim().length < 2) {
      res.status(400).json({ message: "Nome deve ter pelo menos 2 caracteres" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: name.trim() },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
