import "server-only";
import type { UpdateSiteSettingsInput } from "@/contracts/settings";
import { getPrisma } from "@/server/db/prisma";

export async function getAdminSiteSettings() {
  const prisma = getPrisma();
  let settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        siteName: "Reha Spor",
        phone: "+90 533 677 14 45",
        email: "info@rehaspor.com.tr",
        address: "İvedik OSB Çağdaş Emek Sanayi Sitesi, 1437. Cadde No:9, Yenimahalle / Ankara",
        whatsapp: "+90 533 677 14 45",
        instagram: "https://www.instagram.com/rehaspor",
        mapUrl: "https://maps.google.com/?q=Ivedik+OSB+1437+Cadde+No+9+Ankara",
        workingHours: "Pazartesi - Cumartesi, 09.00 - 18.00",
      },
    });
  }

  return {
    id: settings.id,
    siteName: settings.siteName,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    whatsapp: settings.whatsapp,
    instagram: settings.instagram,
    mapUrl: settings.mapUrl,
    workingHours: settings.workingHours,
    defaultSeoTitle: settings.defaultSeoTitle,
    defaultSeoDescription: settings.defaultSeoDescription,
    updatedAt: settings.updatedAt.toISOString(),
  };
}

export async function updateAdminSiteSettings(input: UpdateSiteSettingsInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const current = await getAdminSiteSettings();

  const updated = await prisma.$transaction(async (tx) => {
    const res = await tx.siteSettings.update({
      where: { id: current.id },
      data: {
        siteName: input.siteName,
        phone: input.phone,
        email: input.email,
        address: input.address,
        whatsapp: input.whatsapp,
        instagram: input.instagram,
        mapUrl: input.mapUrl,
        workingHours: input.workingHours,
        defaultSeoTitle: input.defaultSeoTitle || null,
        defaultSeoDescription: input.defaultSeoDescription || null,
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "SETTINGS_UPDATE",
        entityType: "SiteSettings",
        entityId: res.id,
        beforeJson: JSON.parse(JSON.stringify(current)),
        afterJson: JSON.parse(JSON.stringify(res)),
        requestId,
      },
    });

    return res;
  });

  return updated;
}
