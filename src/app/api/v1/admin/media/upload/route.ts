import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    await requireAdminApi(request);

    const url = new URL(request.url);
    const storageKey = url.searchParams.get("key");

    if (!storageKey) {
      // Fallback multipart upload
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return apiError(new Error("Dosya bulunamadı."), requestId);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const dateFolder = new Date().toISOString().slice(0, 7);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const relativePath = `uploads/${dateFolder}/${filename}`;
      const targetDir = join(process.cwd(), "public", "uploads", dateFolder);
      const targetPath = join(targetDir, filename);

      await mkdir(targetDir, { recursive: true });
      await writeFile(targetPath, buffer);

      const publicUrl = `/${relativePath}`;
      return apiSuccess({ publicUrl, storageKey: relativePath }, requestId, { status: 201 });
    }

    // Binary body upload for presigned key destination
    const buffer = Buffer.from(await request.arrayBuffer());
    const publicPath = join(process.cwd(), "public", storageKey);
    const targetDir = publicPath.substring(0, publicPath.lastIndexOf("\\"));

    await mkdir(targetDir, { recursive: true });
    await writeFile(publicPath, buffer);

    const publicUrl = storageKey.startsWith("/") ? storageKey : `/${storageKey}`;
    return apiSuccess({ publicUrl, storageKey }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
