import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().trim().toLowerCase().email("Geçerli bir e-posta adresi girin.").max(320),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır.").max(256),
  rememberMe: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export type AuthenticatedAdmin = {
  id: string;
  email: string;
  displayName: string;
  role: "ADMIN";
};
