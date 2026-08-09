import { z } from "zod";

export const updateSiteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site adı girilmelidir."),
  phone: z.string().min(5, "Telefon numarası girilmelidir."),
  email: z.string().email("Geçerli bir e-posta adresi girilmelidir."),
  address: z.string().min(5, "Adres girilmelidir."),
  whatsapp: z.string().min(5, "WhatsApp numarası girilmelidir."),
  instagram: z.string().url("Geçerli bir URL girilmelidir."),
  mapUrl: z.string().url("Geçerli bir Harita URL'si girilmelidir."),
  workingHours: z.string().min(2, "Çalışma saatleri girilmelidir."),
  defaultSeoTitle: z.string().max(160).nullable().optional(),
  defaultSeoDescription: z.string().max(320).nullable().optional(),
});

export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
