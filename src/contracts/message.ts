import { z } from "zod";

export const contactMessageSchema = z.object({
  fullName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır.").max(100),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  phone: z.string().min(5, "Lütfen geçerli bir telefon numarası girin.").max(30),
  subject: z.string().min(2, "Konu en az 2 karakter olmalıdır.").max(200),
  message: z.string().min(5, "Mesaj en az 5 karakter olmalıdır.").max(2000),
  // Honeypot anti-spam field: MUST BE EMPTY
  website: z.string().max(0, "Spam algılandı.").optional().or(z.literal("")),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
