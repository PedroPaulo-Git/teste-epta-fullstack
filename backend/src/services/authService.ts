import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function registerUser({ email, password }: { email: string, password: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Usuário já existe no sistema");

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
        }
    })
    return { id: user.id, email: user.email }
}
export async function loginUser({ email, password }: { email: string, password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error(" Usuário não encontrado ")
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("senha inválida");

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
    });
    return token;
}