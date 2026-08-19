import {
  ArrowRight,
  BookOpen,
  Boxes,
  Clock,
  FolderKanban,
  History,
  Mail,
  Plus,
  Settings,
  Tags,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminTable } from "@/components/admin/AdminTable";
import { getPrisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";

const quickActions = [
  { href: "/admin/products", label: "Yeni ürün ekle", description: "Kataloğa yeni bir ürün kaydı oluştur.", icon: Plus },
  { href: "/admin/categories", label: "Kategorileri düzenle", description: "Kategori sırasını ve içeriklerini yönet.", icon: Tags },
  { href: "/admin/catalog", label: "Katalog güncelle", description: "Türkçe veya İngilizce PDF yükle.", icon: BookOpen },
  { href: "/admin/settings", label: "Site ayarları", description: "İletişim ve sosyal bağlantıları düzenle.", icon: Settings },
];

function formatActionLabel(action: string) {
  switch (action) {
    case "PRODUCT_CREATE":
      return "Yeni Ürün Oluşturuldu";
    case "PRODUCT_UPDATE":
      return "Ürün Güncellendi";
    case "PRODUCT_DELETE":
      return "Ürün Silindi / Arşivlendi";
    case "CATEGORY_CREATE":
      return "Yeni Kategori Eklendi";
    case "CATEGORY_UPDATE":
      return "Kategori Güncellendi";
    case "CATEGORY_DELETE":
      return "Kategori Silindi";
    case "REFERENCE_CREATE":
      return "Yeni Referans Eklendi";
    case "REFERENCE_UPDATE":
      return "Referans Güncellendi";
    case "REFERENCE_DELETE":
      return "Referans Silindi";
    case "SETTINGS_UPDATE":
      return "Site Ayarları Güncellendi";
    case "CATALOG_UPDATE":
      return "Katalog Güncellendi";
    case "MESSAGE_STATUS_UPDATE":
      return "Mesaj Durumu Değiştirildi";
    default:
      return action;
  }
}

export default async function AdminDashboardPage() {
  const prisma = getPrisma();

  const [
    categoryCount,
    productCount,
    featuredProductCount,
    referenceCount,
    unreadMessageCount,
    totalMessageCount,
    recentMessages,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.category.count({ where: { deletedAt: null } }),
    prisma.product.count({ where: { deletedAt: null } }),
    prisma.product.count({ where: { isFeatured: true, deletedAt: null } }),
    prisma.projectReference.count({ where: { deletedAt: null } }),
    prisma.contactMessage.count({ where: { status: "UNREAD", deletedAt: null } }),
    prisma.contactMessage.count({ where: { deletedAt: null } }),
    prisma.contactMessage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { actor: { select: { displayName: true, email: true } } },
    }),
  ]);

  const todayFormatted = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  return (
    <>
      <AdminHeader
        title="Genel Bakış"
        description="Reha Spor dijital kataloğunun güncel durumunu ve son müşteri taleplerini takip edin."
        eyebrow={todayFormatted}
      />
      <main className="p-4 sm:p-6 xl:p-8">
        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <AdminStatCard label="Toplam kategori" value={categoryCount} description="Aktif ürün grupları" icon={Tags} tone="blue" />
          <AdminStatCard label="Toplam ürün" value={productCount} description={`${featuredProductCount} ürün öne çıkarılıyor`} icon={Boxes} tone="red" />
          <AdminStatCard label="Referans proje" value={referenceCount} description="Portfolyoda yayınlanan projeler" icon={FolderKanban} tone="green" />
          <AdminStatCard label="Okunmamış mesaj" value={unreadMessageCount} description={`${totalMessageCount} toplam müşteri talebi`} icon={Mail} tone="navy" />
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
          {/* Recent Messages */}
          <AdminTable
            title="Son mesajlar"
            description="İletişim formundan gelen en güncel müşteri talepleri."
            headers={["Gönderen", "Konu", "Tarih", "Durum", ""]}
            minWidth="760px"
            action={
              <Link href="/admin/messages" className="inline-flex items-center gap-1.5 text-xs font-black text-brand-red hover:text-red-700">
                Tümünü görüntüle <ArrowRight size={14} />
              </Link>
            }
          >
            {recentMessages.length ? (
              recentMessages.map((message) => (
                <tr key={message.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-bold text-brand-navy">{message.fullName}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{message.email}</p>
                  </td>
                  <td className="max-w-xs px-5 py-4 font-medium text-slate-700">{message.subject}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">{message.createdAt.toLocaleDateString("tr-TR")}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        message.status === "READ"
                          ? "rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600"
                          : "rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black text-brand-red"
                      }
                    >
                      {message.status === "READ" ? "Okundu" : "Yeni"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/messages`} className="font-bold text-brand-navy hover:text-brand-red">
                      İncele
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Henüz bir iletişim mesajı alınmadı.
                </td>
              </tr>
            )}
          </AdminTable>

          {/* Quick actions & Recent Audit Logs */}
          <div className="grid gap-6">
            <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-red">Kısayollar</p>
                <h2 className="mt-1 text-lg font-black text-brand-navy">Hızlı işlemler</h2>
              </div>
              <div className="mt-4 grid gap-2.5">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group flex items-center gap-3 rounded-xl border border-brand-line p-3.5 transition hover:border-red-200 hover:bg-red-50/30"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-navy transition group-hover:bg-brand-red group-hover:text-white">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-brand-navy">{action.label}</span>
                        <span className="mt-0.5 block truncate text-xs text-slate-500">{action.description}</span>
                      </span>
                      <ArrowRight size={16} className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-red" />
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Audit Log Stream */}
            <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <History size={16} className="text-brand-red" />
                <h2 className="text-sm font-black text-brand-navy">Son Yönetici İşlemleri</h2>
              </div>
              <div className="mt-4 divide-y divide-brand-line">
                {recentAuditLogs.length ? (
                  recentAuditLogs.map((log) => (
                    <div key={log.id} className="py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-brand-navy">
                          {formatActionLabel(log.action)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(log.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {log.actor?.displayName || log.actor?.email || "Yönetici"} ({log.entityType})
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Henüz denetim kaydı bulunmuyor.</p>
                )}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-card sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-400">Katalog durumu</p>
            <h2 className="mt-2 text-xl font-black">Ürün kataloğunuz yayına hazır görünüyor.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">PDF kataloğu güncelleyebilir veya yeni ürünleri yayınlamadan önce içeriklerini kontrol edebilirsiniz.</p>
          </div>
          <Link href="/admin/catalog" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-brand-navy transition hover:bg-red-50 sm:mt-0">
            Kataloğu yönet <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </>
  );
}
