import { z } from 'zod';

// Schema para registro de usuário
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .trim()
    .refine((name) => /^[a-zA-ZÀ-ÿ\s]+$/.test(name), {
      message: 'Nome deve conter apenas letras e espaços'
    }),
  email: z
    .string()
    .email('E-mail inválido')
    .min(5, 'E-mail deve ter pelo menos 5 caracteres')
    .max(100, 'E-mail deve ter no máximo 100 caracteres')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password), {
      message: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    })
});

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
});

// Schema para atualização de perfil
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .trim()
    .refine((name) => /^[a-zA-ZÀ-ÿ\s]+$/.test(name), {
      message: 'Nome deve conter apenas letras e espaços'
    })
});

// Tipos TypeScript derivados dos schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>; 