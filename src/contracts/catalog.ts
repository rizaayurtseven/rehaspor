import { z } from "zod";
import { contentStatusSchema } from "./product";

export const catalogLanguageSchema = z.enum(["TR", "EN"]);

export const createCatalogSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır.").max(150),
  language: catalogLanguageSchema.default("TR"),
  description: z.string().min(5, "Açıklama girilmelidir."),
  fileAssetId: z.string().nullable().optional(),
  status: contentStatusSchema.default("DRAFT"),
});

export const updateCatalogSchema = createCatalogSchema.partial();

export type CreateCatalogInput = z.infer<typeof createCatalogSchema>;
export type UpdateCatalogInput = z.infer<typeof updateCatalogSchema>;
