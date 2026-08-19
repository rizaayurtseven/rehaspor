"use client";

import { Pencil, Plus, RotateCcw, Save, Search, Trash2, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { MediaUploader } from "@/components/admin/MediaUploader";

type CategoryAdminRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  productCount: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  coverImage?: string;
};

type CategoryFormValues = Omit<CategoryAdminRow, "productCount">;

const emptyForm: CategoryFormValues = {
  id: "",
  title: "",
  slug: "",
  description: "",
  status: "PUBLISHED",
  sortOrder: 0,
  coverImage: "",
};

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

const ITEMS_PER_PAGE = 8;

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryAdminRow[]>([]);
  const [form, setForm] = useState<CategoryFormValues>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  
  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CategoryAdminRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/categories");
      const data = await res.json();
      if (res.ok && data.data?.categories) {
        setRows(data.data.categories);
      }
    } catch {
      setToast("Kategoriler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter((category) => {
      const matchesStatus = statusFilter === "ALL" || category.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${category.title} ${category.slug} ${category.description}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [query, rows, statusFilter]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);

  function resetForm() {
    setForm(emptyForm);
    setFieldErrors({});
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    setForm((current) => ({ ...current, title, slug: current.id ? current.slug : createSlug(title) }));
  }

  function handleEdit(category: CategoryAdminRow) {
    setFieldErrors({});
    setForm({
      id: category.id,
      title: category.title,
      slug: category.slug,
      description: category.description,
      status: category.status,
      sortOrder: category.sortOrder,
      coverImage: category.coverImage || "",
    });
    document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleToggleStatus(category: CategoryAdminRow) {
    const newStatus = category.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/v1/admin/categories/${category.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setToast(`“${category.title}” durumu ${newStatus === "PUBLISHED" ? "Yayında" : "Taslak"} olarak güncellendi.`);
        loadCategories();
      }
    } catch {
      setToast("Durum güncellenirken hata oluştu.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/v1/admin/categories/${deleteTarget.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        setToast(payload.error?.message || "Kategori silinemedi.");
        return;
      }

      setToast("Kategori başarıyla silindi/arşivlendi.");
      if (form.id === deleteTarget.id) resetForm();
      setDeleteTarget(null);
      loadCategories();
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
    const url = isEdit ? `/api/v1/admin/categories/${form.id}` : "/api/v1/admin/categories";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          status: form.status,
          sortOrder: Number(form.sortOrder) || 0,
          imageUrl: form.coverImage?.trim() || undefined,
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

      setToast(isEdit ? "Kategori başarıyla güncellendi." : "Yeni kategori başarıyla oluşturuldu.");
      resetForm();
      loadCategories();
    } catch {
      setToast("Sunucu ile iletişim kurulamadı.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Kategori Yönetimi"
        description="Ürün gruplarını, slug adreslerini, yayın durumlarını ve kategori kapak görsellerini yönetin."
        action={
          <button
            type="button"
            onClick={() => {
              resetForm();
              document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-xs font-black text-white hover:bg-red-700"
          >
            <Plus size={15} /> Yeni Kategori
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
                  placeholder="Kategori adı veya slug ara..."
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
              title="Kategoriler"
              description={`${filteredRows.length} kategori listeleniyor`}
              headers={["Kategori", "Slug", "Ürün Sayısı", "Durum", "Sıra", "İşlemler"]}
              minWidth="760px"
            >
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                    <p className="mt-2 text-xs">Kategoriler yükleniyor...</p>
                  </td>
                </tr>
              ) : paginatedRows.length ? (
                paginatedRows.map((cat) => (
                  <tr key={cat.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="font-bold text-brand-navy">{cat.title}</p>
                      <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-slate-500">{cat.description}</p>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-600">{cat.slug}</td>
                    <td className="px-5 py-4 text-xs font-bold text-brand-navy">{cat.productCount} ürün</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(cat)}
                        title="Durumu değiştirmek için tıklayın"
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-black transition ${
                          cat.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {cat.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-500">{cat.sortOrder}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(cat)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line text-slate-600 transition hover:border-brand-navy hover:text-brand-navy"
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(cat)}
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
                <AdminEmptyRow colSpan={6} message="Arama kriterine uygun kategori bulunamadı." />
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
            id="category-form"
            className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm 2xl:sticky 2xl:top-6"
          >
            <div className="flex items-center justify-between border-b border-brand-line bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">
                  {form.id ? "Düzenleme Modu" : "Yeni Kayıt"}
                </p>
                <h2 className="mt-0.5 text-base font-black text-brand-navy">
                  {form.id ? `Kategoriyi Düzenle` : "Kategori Oluştur"}
                </h2>
              </div>
              {form.id ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-line bg-white px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <X size={13} /> İptal
                </button>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 p-5">
              <AdminFormField label="Kategori Adı" htmlFor="cat-title" required error={fieldErrors.title?.[0]}>
                <input
                  id="cat-title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Örn: Zemin Kaplamaları"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50"
                />
              </AdminFormField>

              <AdminFormField
                label="Slug (URL Yolu)"
                htmlFor="cat-slug"
                hint="Türkçe karakter içermez, otomatik oluşturulur."
                required
                error={fieldErrors.slug?.[0]}
              >
                <input
                  id="cat-slug"
                  value={form.slug}
                  onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))}
                  placeholder="zemin-kaplamalari"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 font-mono text-xs outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50"
                />
              </AdminFormField>

              <AdminFormField label="Kısa Açıklama" htmlFor="cat-desc" required error={fieldErrors.description?.[0]}>
                <textarea
                  id="cat-desc"
                  value={form.description}
                  onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                  placeholder="Kategori hakkında kısa tanıtım..."
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50"
                />
              </AdminFormField>

              <div className="grid grid-cols-2 gap-3">
                <AdminFormField label="Yayın Durumu" htmlFor="cat-status">
                  <select
                    id="cat-status"
                    value={form.status}
                    onChange={(e) => setForm((c) => ({ ...c, status: e.target.value as any }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs font-bold outline-none focus:border-brand-red"
                  >
                    <option value="PUBLISHED">Yayında</option>
                    <option value="DRAFT">Taslak</option>
                    <option value="ARCHIVED">Arşivlendi</option>
                  </select>
                </AdminFormField>

                <AdminFormField label="Sıralama Önceliği" htmlFor="cat-order">
                  <input
                    id="cat-order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((c) => ({ ...c, sortOrder: Number(e.target.value) || 0 }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs outline-none focus:border-brand-red"
                  />
                </AdminFormField>
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-brand-navy">Kategori Kapak Görseli</span>
                <MediaUploader
                  value={form.coverImage}
                  onChange={(url) => setForm((c) => ({ ...c, coverImage: url }))}
                  label="Kategori Görseli Seçin"
                  helper="PNG, JPG veya WebP · maks. 10 MB"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 border-t border-brand-line pt-4">
                <button
                  type="button"
                  onClick={resetForm}
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
                  {form.id ? "Değişiklikleri Kaydet" : "Kategoriyi Kaydet"}
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
        title="Kategoriyi Sil"
        description={
          deleteTarget ? (
            <p>
              <strong className="font-bold text-brand-navy">{deleteTarget.title}</strong> kategorisini silmek
              istediğinize emin misiniz?
              {deleteTarget.productCount > 0 ? (
                <span className="mt-2 block rounded-lg bg-amber-50 p-2.5 text-xs font-semibold text-amber-800">
                  <AlertCircle size={14} className="inline mr-1 -mt-0.5 text-amber-600" />
                  Bu kategoriye bağlı <strong>{deleteTarget.productCount}</strong> adet ürün bulunmaktadır.
                </span>
              ) : null}
            </p>
          ) : null
        }
        isLoading={isDeleting}
      />

      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
