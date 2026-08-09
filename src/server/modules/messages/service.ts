import "server-only";
import type { ContactMessageInput } from "@/contracts/message";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

export async function createContactMessage(input: ContactMessageInput) {
  const prisma = getPrisma();
  const msg = await prisma.contactMessage.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      subject: input.subject,
      message: input.message,
      source: "WEB",
      status: "UNREAD",
    },
  });

  return { id: msg.id, createdAt: msg.createdAt.toISOString() };
}

export async function getAdminMessages() {
  const prisma = getPrisma();
  const msgs = await prisma.contactMessage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { readBy: { select: { displayName: true } } },
  });

  return msgs.map((m) => ({
    id: m.id,
    fullName: m.fullName,
    email: m.email,
    phone: m.phone,
    subject: m.subject,
    message: m.message,
    status: m.status,
    source: m.source,
    readAt: m.readAt ? m.readAt.toISOString() : null,
    readBy: m.readBy?.displayName || null,
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function updateAdminMessageStatus(id: string, status: "UNREAD" | "READ" | "ARCHIVED", actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.contactMessage.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Mesaj bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    const res = await tx.contactMessage.update({
      where: { id },
      data: {
        status,
        ...(status === "READ" ? { readAt: new Date(), readByUserId: actorUserId } : {}),
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "MESSAGE_STATUS_UPDATE",
        entityType: "ContactMessage",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        afterJson: JSON.parse(JSON.stringify(res)),
        requestId,
      },
    });

    return res;
  });

  return updated;
}

export async function deleteAdminMessage(id: string, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.contactMessage.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Mesaj bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.contactMessage.update({
      where: { id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "MESSAGE_DELETE",
        entityType: "ContactMessage",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        requestId,
      },
    });
  });
}
