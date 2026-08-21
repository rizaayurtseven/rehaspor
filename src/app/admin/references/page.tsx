"use client";

import { MapPin, Pencil, Plus, RotateCcw, Save, Search, Trash2, X, Loader2, Calendar } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { MediaUploader } from "@/components/admin/MediaUploader";

type ReferenceAdminRow = {
  id: string;
  title: string;
  slug: string;
  city: string;
  year: number;
  category: string;
  description: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  coverImage?: string;
};

type ReferenceFormValues = {
  id: string;
  title: string;
  slug: string;
  city: string;
  year: string;
  category: string;
  description: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  coverImage: string;
};

const emptyForm: ReferenceFormValues = {
  id: "",
  title: "",
  slug: "",
  city: "",
  year: String(new Date().getFullYear()),
  category: "Zemin Uygulaması",
  description: "",
  status: "PUBLISHED",
  sortOrder: 0,
  coverImage: "",
};

const projectCategories = ["Zemin Uygulaması", "Spor Ekipmanları", "Padel Court", "Saha Yenileme", "Çim Saha"];
const ITEMS_PER_PAGE = 8;

function createSlug(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminReferencesPage() {
  const [rows, setRows] = useState<ReferenceAdminRow[]>([]);
  const [form, setForm] = useState<ReferenceFormValues>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ReferenceAdminRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadReferences() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/references");
      const data = await res.json();
      if (res.ok && data.data?.references) {
        setRows(data.data.references);
      }
    } catch {
      setToast("Referanslar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReferences();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter((reference) => {
      const matchesStatus = statusFilter === "ALL" || reference.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${reference.title} ${reference.city} ${reference.category}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [query, rows, statusFilter]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);

  function openNewForm() {
    setFieldErrors({});
    setForm(emptyForm);
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEdit(reference: ReferenceAdminRow) {
    setFieldErrors({});
    setForm({
      id: reference.id,
      title: reference.title,
      slug: reference.slug,
      city: reference.city,
      year: String(reference.year),
      category: reference.category,
      description: reference.description,
      status: reference.status,
      sortOrder: reference.sortOrder,
      coverImage: reference.coverImage || "",
    });
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleToggleStatus(reference: ReferenceAdminRow) {
    const newStatus = reference.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/v1/admin/references/${reference.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setToast(`“${reference.title}” durumu ${newStatus === "PUBLISHED" ? "Yayında" : "Taslak"} olarak güncellendi.`);
        loadReferences();
      }
    } catch {
      setToast("Durum güncellenirken hata oluştu.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/v1/admin/references/${deleteTarget.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        setToast(payload.error?.message || "Referans silinemedi.");
        return;
      }

      setToast("Referans proje başarıyla silindi/arşivlendi.");
      if (form.id === deleteTarget.id) setForm(emptyForm);
      setDeleteTarget(null);
      loadReferences();
    } catch {
      setToast("Sunucuya bağlanılamadı.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const isEdit = Boolean(form.id);
    const url = isEdit ? `/api/v1/admin/references/${form.id}` : "/api/v1/admin/references";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim() || createSlug(form.title),
          city: form.city.trim(),
          year: Number(form.year),
          category: form.category,
          description: form.description.trim(),
          status: form.status,
          sortOrder: Number(form.sortOrder) || 0,
          imageUrl: form.coverImage.trim() || undefined,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        if (payload.error?.details?.fields) {
          setFieldErrors(payload.error.details.fields);
        }
        setToast(payload.error?.message || "İşlem başarısız.");
        return;
      }

      setToast(isEdit ? "Referans başarıyla güncellendi." : "Yeni referans başarıyla eklendi.");
      openNewForm();
      loadReferences();
    } catch {
      setToast("Sunucu ile iletişim kurulamadı.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Referans Projeler"
        description="Tamamlanan saha ve tesis uygulamalarını, şehir, yıl ve proje fotoğraflarını yönetin."
        action={
          <button
            type="button"
            onClick={openNewForm}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-xs font-black text-white hover:bg-red-700"
          >
            <Plus size={15} /> Yeni Proje Ekle
          </button>
        }
      />

      <main className="p-4 sm:p-6 xl:p-8">
        <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)]">
          {/* Table section */}
          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-md">
                <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Proje adı, şehir veya kategori ara..."
                  className="w-full rounded-xl border border-brand-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50"
                />
              </div>

              <div className="inline-flex rounded-xl border border-brand-line bg-white p-1">
                {[
                  { value: "ALL", label: `Tümü (${rows.length})` },
                  { value: "PUBLISHED", label: "Yayında" },
                  { value: "DRAFT", label: "Taslak" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => {
                      setStatusFilter(tab.value);
                      setCurrentPage(1);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      statusFilter === tab.value
                        ? "bg-brand-navy text-white"
                        : "text-slate-500 hover:text-brand-navy"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AdminTable
              title="Referanslar"
              description={`${filteredRows.length} proje listeleniyor`}
              headers={["Proje Adı", "Şehir & Yıl", "Kategori", "Durum", "İşlemler"]}
              minWidth="760px"
            >
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                    <p className="mt-2 text-xs">Referanslar yükleniyor...</p>
                  </td>
                </tr>
              ) : paginatedRows.length ? (
                paginatedRows.map((ref) => (
                  <tr key={ref.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-bold text-brand-navy">{ref.title}</p>
                      <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-slate-500">{ref.description}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand-red" />
                        {ref.city} · {ref.year}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-600">{ref.category}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(ref)}
                        title="Durumu değiştirmek için tıklayın"
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-black transition ${
                          ref.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {ref.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(ref)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line text-slate-600 transition hover:border-brand-navy hover:text-brand-navy"
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(ref)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line text-slate-400 transition hover:border-brand-red hover:text-brand-red"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <AdminEmptyRow colSpan={5} message="Arama kriterine uygun referans proje bulunamadı." />
              )}
            </AdminTable>

            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredRows.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Form section */}
          <section
            id="reference-form"
            className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm 2xl:sticky 2xl:top-6"
          >
            <div className="flex items-center justify-between border-b border-brand-line bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">
                  {form.id ? "Düzenleme Modu" : "Yeni Proje Kaydı"}
                </p>
                <h2 className="mt-0.5 text-base font-black text-brand-navy">
                  {form.id ? "Projeyi Güncelle" : "Referans Proje Ekle"}
                </h2>
              </div>
              {form.id ? (
                <button
                  type="button"
                  onClick={openNewForm}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-line bg-white px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <X size={13} /> İptal
                </button>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 p-5">
              <AdminFormField label="Proje Adı" htmlFor="ref-title" required error={fieldErrors.title?.[0]}>
                <input
                  id="ref-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((c) => ({
                      ...c,
                      title: e.target.value,
                      slug: c.id ? c.slug : createSlug(e.target.value),
                    }))
                  }
                  placeholder="Örn: Ankara Spor Kompleksi Padel Kortu"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField label="Slug (URL)" htmlFor="ref-slug" required error={fieldErrors.slug?.[0]}>
                <input
                  id="ref-slug"
                  value={form.slug}
                  onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))}
                  placeholder="ankara-spor-kompleksi-padel"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 font-mono text-xs outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <div className="grid grid-cols-2 gap-3">
                <AdminFormField label="Şehir" htmlFor="ref-city" required error={fieldErrors.city?.[0]}>
                  <input
                    id="ref-city"
                    value={form.city}
                    onChange={(e) => setForm((c) => ({ ...c, city: e.target.value }))}
                    placeholder="Ankara"
                    required
                    className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 text-xs outline-none focus:border-brand-red"
                  />
                </AdminFormField>

                <AdminFormField label="Yıl" htmlFor="ref-year" required error={fieldErrors.year?.[0]}>
                  <input
                    id="ref-year"
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm((c) => ({ ...c, year: e.target.value }))}
                    placeholder="2026"
                    required
                    className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 text-xs outline-none focus:border-brand-red"
                  />
                </AdminFormField>
              </div>

              <AdminFormField label="Kategori" htmlFor="ref-cat" required error={fieldErrors.category?.[0]}>
                <select
                  id="ref-cat"
                  value={form.category}
                  onChange={(e) => setForm((c) => ({ ...c, category: e.target.value }))}
                  className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs font-bold outline-none focus:border-brand-red"
                >
                  {projectCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </AdminFormField>

              <AdminFormField label="Açıklama" htmlFor="ref-desc" required error={fieldErrors.description?.[0]}>
                <textarea
                  id="ref-desc"
                  value={form.description}
                  onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                  placeholder="Proje kapsamında yapılan zemin ve ekipman uygulamaları..."
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <div>
                <span className="mb-2 block text-xs font-bold text-brand-navy">Proje Fotoğrafı</span>
                <MediaUploader
                  value={form.coverImage}
                  onChange={(url) => setForm((c) => ({ ...c, coverImage: url }))}
                  label="Proje Fotoğrafı Seçin"
                  helper="PNG, JPG veya WebP · maks. 10 MB"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AdminFormField label="Yayın Durumu" htmlFor="ref-status">
                  <select
                    id="ref-status"
                    value={form.status}
                    onChange={(e) => setForm((c) => ({ ...c, status: e.target.value as any }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs font-bold outline-none focus:border-brand-red"
                  >
                    <option value="PUBLISHED">Yayında</option>
                    <option value="DRAFT">Taslak</option>
                    <option value="ARCHIVED">Arşivlendi</option>
                  </select>
                </AdminFormField>

                <AdminFormField label="Sıralama" htmlFor="ref-order">
                  <input
                    id="ref-order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((c) => ({ ...c, sortOrder: Number(e.target.value) || 0 }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs outline-none focus:border-brand-red"
                  />
                </AdminFormField>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-brand-line pt-4">
                <button
                  type="button"
                  onClick={openNewForm}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <RotateCcw size={14} /> Temizle
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-xs font-black text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {form.id ? "Projeyi Güncelle" : "Projeyi Kaydet"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Delete confirmation modal */}
      <AdminConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Referansı Sil"
        description={
          deleteTarget ? (
            <p>
              <strong className="font-bold text-brand-navy">{deleteTarget.title}</strong> projesini
              silmek/arşivlemek istediğinize emin misiniz?
            </p>
          ) : null
        }
        isLoading={isDeleting}
      />

      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
