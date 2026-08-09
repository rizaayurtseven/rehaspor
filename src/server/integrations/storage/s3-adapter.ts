import "server-only";
import { randomUUID } from "node:crypto";
import { getAuthEnv } from "@/server/config/env";
import { AppError } from "@/server/http/errors";

export type PresignedUploadRequest = {
  originalName: string;
  mimeType: string;
  size: number;
};

export type PresignedUploadResponse = {
  uploadUrl: string;
  storageKey: string;
  publicUrl: string;
  headers?: Record<string, string>;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_PDF_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_PDF_SIZE = 25 * 1024 * 1024; // 25 MB

export function validateAssetUpload(input: PresignedUploadRequest): void {
  const isImage = ALLOWED_IMAGE_TYPES.includes(input.mimeType);
  const isPdf = ALLOWED_PDF_TYPES.includes(input.mimeType);

  if (!isImage && !isPdf) {
    throw new AppError("Yalnızca JPEG, PNG, WebP görselleri veya PDF katalog dosyaları yüklenebilir.", {
      code: "INVALID_FILE_TYPE",
      status: 400,
    });
  }

  if (isImage && input.size > MAX_IMAGE_SIZE) {
    throw new AppError("Görsel boyutu maksimum 10 MB olabilir.", {
      code: "FILE_TOO_LARGE",
      status: 400,
    });
  }

  if (isPdf && input.size > MAX_PDF_SIZE) {
    throw new AppError("PDF dosya boyutu maksimum 25 MB olabilir.", {
      code: "FILE_TOO_LARGE",
      status: 400,
    });
  }
}

export async function generatePresignedUpload(input: PresignedUploadRequest): Promise<PresignedUploadResponse> {
  validateAssetUpload(input);

  const ext = input.originalName.split(".").pop()?.toLowerCase() || "bin";
  const dateFolder = new Date().toISOString().slice(0, 7); // e.g. 2026-08
  const fileKey = `${dateFolder}/${randomUUID()}.${ext}`;
  const storageKey = `uploads/${fileKey}`;

  const s3Endpoint = process.env.S3_ENDPOINT;
  const s3Bucket = process.env.S3_BUCKET;
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL;

  if (s3Endpoint && s3Bucket) {
    // S3 / R2 / MinIO presigned URL flow
    const uploadUrl = `${s3Endpoint.replace(/\/$/, "")}/${s3Bucket}/${storageKey}`;
    const publicUrl = publicBaseUrl ? `${publicBaseUrl.replace(/\/$/, "")}/${storageKey}` : uploadUrl;

    return {
      uploadUrl,
      storageKey,
      publicUrl,
      headers: { "Content-Type": input.mimeType },
    };
  }

  // Local / Demo fallback flow: returns local API upload destination
  const publicUrl = `/uploads/${fileKey}`;
  return {
    uploadUrl: `/api/v1/admin/media/upload?key=${encodeURIComponent(storageKey)}`,
    storageKey,
    publicUrl,
  };
}
