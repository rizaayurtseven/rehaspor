import { z } from "zod";

export const presignMediaSchema = z.object({
  originalName: z.string().min(1, "Dosya adı eksik."),
  mimeType: z.string().min(1, "MIME türü eksik."),
  size: z.number().positive("Geçersiz dosya boyutu."),
});

export const completeMediaSchema = z.object({
  assetId: z.string().min(1, "Asset ID eksik."),
});

export type PresignMediaInput = z.infer<typeof presignMediaSchema>;
export type CompleteMediaInput = z.infer<typeof completeMediaSchema>;
