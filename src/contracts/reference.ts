import { z } from "zod";
import { contentStatusSchema } from "./product";

export const createReferenceSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır.").max(200),
  slug: z.string().min(2, "Slug en az 2 karakter olmalıdır.").max(200).regex(/^[a-z0-9-]+$/),
  city: z.string().min(2, "Şehir adı girilmelidir."),
  year: z.number().int().min(1990).max(2100),
  category: z.string().min(2, "Kategori girilmelidir."),
  description: z.string().min(5, "Açıklama girilmelidir."),
  imageAssetId: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  status: contentStatusSchema.default("DRAFT"),
  seoTitle: z.string().max(160).nullable().optional(),
  seoDescription: z.string().max(320).nullable().optional(),
});

export const updateReferenceSchema = createReferenceSchema.partial();

export type CreateReferenceInput = z.infer<typeof createReferenceSchema>;
export type UpdateReferenceInput = z.infer<typeof updateReferenceSchema>;
