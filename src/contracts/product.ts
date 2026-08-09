import { z } from "zod";

export const contentStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createProductSchema = z.object({
  code: z.string().min(2, "Ürün kodu en az 2 karakter olmalıdır.").max(50),
  title: z.string().min(2, "Ürün başlığı en az 2 karakter olmalıdır.").max(200),
  slug: z.string().min(2, "Slug en az 2 karakter olmalıdır.").max(200).regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire (-) içerebilir."),
  categoryId: z.string().min(1, "Kategori seçilmelidir."),
  shortDescription: z.string().min(5, "Kısa açıklama en az 5 karakter olmalıdır."),
  description: z.string().min(5, "Detaylı açıklama en az 5 karakter olmalıdır."),
  isFeatured: z.boolean().default(false),
  status: contentStatusSchema.default("DRAFT"),
  sortOrder: z.number().int().default(0),
  technicalDetails: z.array(z.string()).default([]),
  usageAreas: z.array(z.string()).default([]),
  applicationSteps: z.array(z.string()).default([]),
  catalogPageAssetId: z.string().nullable().optional(),
  catalogPdfAssetId: z.string().nullable().optional(),
  seoTitle: z.string().max(160).nullable().optional(),
  seoDescription: z.string().max(320).nullable().optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
