import "server-only";
import type { PresignMediaInput } from "@/contracts/media";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";
import { generatePresignedUpload, validateAssetUpload } from "@/server/integrations/storage/s3-adapter";

export async function presignMediaAsset(input: PresignMediaInput, actorUserId: string, requestId: string) {
  validateAssetUpload(input);
  const prisma = getPrisma();

  const presignResult = await generatePresignedUpload(input);

  const asset = await prisma.$transaction(async (tx) => {
    const created = await tx.asset.create({
      data: {
        storageKey: presignResult.storageKey,
        originalName: input.originalName,
        mimeType: input.mimeType,
        size: input.size,
        status: "PENDING",
        uploadedByUserId: actorUserId,
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "MEDIA_PRESIGN",
        entityType: "Asset",
        entityId: created.id,
        afterJson: JSON.parse(JSON.stringify(created)),
        requestId,
      },
    });

    return created;
  });

  return {
    assetId: asset.id,
    storageKey: asset.storageKey,
    uploadUrl: presignResult.uploadUrl,
    publicUrl: presignResult.publicUrl,
    headers: presignResult.headers,
  };
}

export async function completeMediaAsset(assetId: string, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.asset.findUnique({ where: { id: assetId } });

  if (!existing) {
    throw new AppError("Medya kaydı bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    const res = await tx.asset.update({
      where: { id: assetId },
      data: { status: "READY" },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "MEDIA_COMPLETE",
        entityType: "Asset",
        entityId: assetId,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        afterJson: JSON.parse(JSON.stringify(res)),
        requestId,
      },
    });

    return res;
  });

  return {
    id: updated.id,
    storageKey: updated.storageKey,
    status: updated.status,
    publicUrl: updated.storageKey.startsWith("/") ? updated.storageKey : "/" + updated.storageKey,
  };
}
