import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// Middleware genérico para validação com Zod
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Valida o body da requisição
      const validatedData = await schema.parseAsync(req.body);
      
      // Substitui o body pela versão validada
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Formata os erros de validação
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        res.status(400).json({
          message: 'Dados inválidos',
          errors
        });
        return;
      }
      
      // Erro inesperado
      console.error('Erro de validação:', error);
      res.status(500).json({
        message: 'Erro interno do servidor'
      });
      return;
    }
  };
}; 