"use client";

import { CheckCheck, Mail, MailOpen, Phone, Search, Send, Trash2, User, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";

type AdminMessage = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "ARCHIVED";
  createdAt: string;
};

type MessageFilter = "all" | "unread" | "read";
const ITEMS_PER_PAGE = 8;

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<AdminMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadMessages() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/messages");
      const data = await res.json();
      if (res.ok && data.data?.messages) {
        setMessages(data.data.messages);
        if (data.data.messages.length > 0 && !selectedId) {
          setSelectedId(data.data.messages[0].id);
        }
      }
    } catch {
      setToast("Mesajlar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return messages.filter((message) => {
      const isUnread = message.status === "UNREAD";
      const matchesFilter = filter === "all" || (filter === "unread" ? isUnread : !isUnread);
      const matchesQuery =
        !normalizedQuery ||
        `${message.fullName} ${message.email} ${message.subject} ${message.message}`
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, messages, query]);

  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE) || 1;
  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMessages.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredMessages]);

  const selectedMessage = messages.find((message) => message.id === selectedId);
  const unreadCount = messages.filter((message) => message.status === "UNREAD").length;

  async function selectMessage(message: AdminMessage) {
    setSelectedId(message.id);
    if (message.status === "UNREAD") {
      try {
        await fetch(`/api/v1/admin/messages/${message.id}/status`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status: "READ" }),
        });
        setMessages((current) => current.map((item) => (item.id === message.id ? { ...item, status: "READ" } : item)));
      } catch {
        // Ignore background read status update error
      }
    }
  }

  async function toggleRead(message: AdminMessage) {
    const newStatus = message.status === "READ" ? "UNREAD" : "READ";
    try {
      const res = await fetch(`/api/v1/admin/messages/${message.id}/status`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setMessages((current) => current.map((item) => (item.id === message.id ? { ...item, status: newStatus } : item)));
        setToast(newStatus === "UNREAD" ? "Mesaj okunmadı olarak işaretlendi." : "Mesaj okundu olarak işaretlendi.");
      }
    } catch {
      setToast("Durum güncellenemedi.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/v1/admin/messages/${deleteTarget.id}/status`, { method: "DELETE" });
      if (res.ok) {
        const remaining = messages.filter((item) => item.id !== deleteTarget.id);
        setMessages(remaining);
        if (selectedId === deleteTarget.id) setSelectedId(remaining[0]?.id ?? "");
        setToast("Mesaj silindi.");
        setDeleteTarget(null);
      }
    } catch {
      setToast("Mesaj silinemedi.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Mesajlar"
        description="İletişim formundan gelen talepleri inceleyin, durumlarını güncelleyin ve doğrudan e-posta ile yanıtlayın."
        eyebrow={`${unreadCount} okunmamış mesaj`}
      />
      <main className="p-4 sm:p-6 xl:p-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Gönderen, e-posta veya konu ara..."
              className="w-full rounded-xl border border-brand-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
            />
          </div>
          <div className="inline-flex self-start rounded-xl border border-brand-line bg-white p-1">
            {(
              [
                ["all", `Tümü (${messages.length})`],
                ["unread", `Okunmamış (${unreadCount})`],
                ["read", "Okundu"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setFilter(value);
                  setCurrentPage(1);
                }}
                className={
                  filter === value
                    ? "rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-black text-white"
                    : "rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-brand-navy"
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(380px,0.8fr)]">
          {/* Table section */}
          <div>
            <AdminTable
              title="Gelen Kutusu"
              description={`${filteredMessages.length} mesaj gösteriliyor`}
              headers={["Gönderen", "Konu", "Tarih", "Durum", ""]}
              minWidth="760px"
            >
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                    <p className="mt-2 text-xs">Mesajlar yükleniyor...</p>
                  </td>
                </tr>
              ) : paginatedMessages.length ? (
                paginatedMessages.map((message) => {
                  const isUnread = message.status === "UNREAD";
                  return (
                    <tr
                      key={message.id}
                      className={`cursor-pointer transition ${
                        selectedId === message.id ? "bg-red-50/50 font-medium" : "hover:bg-slate-50/70"
                      }`}
                      onClick={() => selectMessage(message)}
                    >
                      <td className="px-5 py-4">
                        <span className="block font-black text-brand-navy">{message.fullName}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{message.email}</span>
                      </td>
                      <td className="max-w-xs px-5 py-4">
                        <span className="line-clamp-1 text-sm font-semibold text-slate-700">{message.subject}</span>
                        <span className="line-clamp-1 mt-0.5 text-xs text-slate-400">{message.message}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                        {new Date(message.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={
                            !isUnread
                              ? "rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600"
                              : "rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black text-brand-red"
                          }
                        >
                          {!isUnread ? "Okundu" : "Yeni"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectMessage(message);
                          }}
                          className="text-xs font-black text-brand-red hover:text-red-700"
                        >
                          Detay
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <AdminEmptyRow colSpan={5} message="Bu görünümde mesaj bulunamadı." />
              )}
            </AdminTable>

            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredMessages.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Details Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm 2xl:sticky 2xl:top-6">
            {selectedMessage ? (
              <>
                <div className="border-b border-brand-line bg-brand-navy p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-400">Mesaj Detayı</p>
                      <h2 className="mt-1.5 text-lg font-black leading-6">{selectedMessage.subject}</h2>
                      <p className="mt-1 text-xs text-slate-400">{new Date(selectedMessage.createdAt).toLocaleString("tr-TR")}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                      <MailOpen size={19} />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid gap-2.5 text-sm">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <User size={16} className="text-brand-red" />
                      <span>
                        <span className="block text-[10px] font-bold uppercase text-slate-400">Gönderen</span>
                        <span className="font-bold text-brand-navy">{selectedMessage.fullName}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <Mail size={16} className="text-brand-red" />
                      <a href={`mailto:${selectedMessage.email}`} className="font-semibold text-slate-700 hover:text-brand-red">
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                      <Phone size={16} className="text-brand-red" />
                      <a href={`tel:${selectedMessage.phone}`} className="font-semibold text-slate-700 hover:text-brand-red">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-brand-line p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">Mesaj İçeriği</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white hover:bg-red-700 shadow-sm"
                    >
                      <Send size={16} /> E-posta ile Yanıtla
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleRead(selectedMessage)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line px-4 py-3 text-sm font-black text-brand-navy hover:border-brand-navy"
                    >
                      <CheckCheck size={16} /> {selectedMessage.status === "READ" ? "Okunmadı Yap" : "Okundu Yap"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(selectedMessage)}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-brand-red hover:bg-red-50"
                  >
                    <Trash2 size={15} /> Mesajı Sil
                  </button>
                </div>
              </>
            ) : (
              <div className="grid min-h-96 place-items-center p-8 text-center">
                <div>
                  <MailOpen size={30} className="mx-auto text-slate-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">Detayını görmek için bir mesaj seçin.</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Delete confirmation modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Mesajı Sil"
        description={
          deleteTarget ? (
            <p>
              <strong className="font-bold text-brand-navy">{deleteTarget.fullName}</strong> tarafından gönderilen{" "}
              “{deleteTarget.subject}” konulu mesajı silmek istediğinize emin misiniz?
            </p>
          ) : null
        }
        isLoading={isDeleting}
      />

      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
