import { z } from "zod";

export const categoryStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createCategorySchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır.").max(120),
  slug: z.string().min(2, "Slug en az 2 karakter olmalıdır.").max(120).regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire (-) içerebilir."),
  description: z.string().min(5, "Açıklama en az 5 karakter olmalıdır."),
  imageAssetId: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  status: categoryStatusSchema.default("DRAFT"),
  seoTitle: z.string().max(160).nullable().optional(),
  seoDescription: z.string().max(320).nullable().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
