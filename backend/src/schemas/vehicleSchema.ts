import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  plate: z.string().regex(/^[A-Z]{3}-\d{4}$/, "Placa inválida"),
});
