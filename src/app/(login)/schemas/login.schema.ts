import { z } from "zod";
// hay que configurar el mensaje de error cuando sea para un cliente en otro idioma
export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});
