import { z } from "zod";

export const vehicleSchema = z.object({
  model: z.string().min(1, "Modelo é obrigatório"),
  plate: z.string().regex(/^[A-Z]{3}-\d[A-Z]\d{2}$/, "Placa inválida"),
});
