"use client";

import { Filter, Pencil, Plus, RotateCcw, Save, Search, Star, Trash2, X, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { MediaUploader } from "@/components/admin/MediaUploader";

type CategoryOption = {
  id: string;
  title: string;
  slug: string;
};

type ProductAdminRow = {
  id: string;
  code: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryTitle: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  technicalDetails: string[];
  usageAreas: string[];
  applicationSteps: string[];
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  mainImage?: string;
};

type ProductFormValues = {
  id: string;
  code: string;
  title: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  technicalDetails: string;
  usageAreas: string;
  applicationSteps: string;
  isFeatured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
  mainImage: string;
};

const emptyForm: ProductFormValues = {
  id: "",
  code: "",
  title: "",
  slug: "",
  categoryId: "",
  shortDescription: "",
  description: "",
  technicalDetails: "",
  usageAreas: "",
  applicationSteps: "",
  isFeatured: false,
  status: "PUBLISHED",
  sortOrder: 0,
  mainImage: "",
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

export default function AdminProductsPage() {
  const [rows, setRows] = useState<ProductAdminRow[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [form, setForm] = useState<ProductFormValues>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<ProductAdminRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/v1/admin/products"),
        fetch("/api/v1/admin/categories"),
      ]);

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodRes.ok && prodData.data?.products) {
        setRows(prodData.data.products);
      }
      if (catRes.ok && catData.data?.categories) {
        setCategories(catData.data.categories);
        if (catData.data.categories.length > 0 && !form.categoryId) {
          setForm((curr) => ({ ...curr, categoryId: catData.data.categories[0].id }));
        }
      }
    } catch {
      setToast("Ürünler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter((product) => {
      const matchesCategory = !categoryFilter || product.categoryId === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || product.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${product.code} ${product.title} ${product.shortDescription}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [categoryFilter, query, rows, statusFilter]);

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);

  function openNewForm() {
    setFieldErrors({});
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id || "",
    });
    document.getElementById("product-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEdit(product: ProductAdminRow) {
    setFieldErrors({});
    setForm({
      id: product.id,
      code: product.code,
      title: product.title,
      slug: product.slug,
      categoryId: product.categoryId,
      shortDescription: product.shortDescription,
      description: product.description || product.shortDescription,
      technicalDetails: (product.technicalDetails || []).join("\n"),
      usageAreas: (product.usageAreas || []).join("\n"),
      applicationSteps: (product.applicationSteps || []).join("\n"),
      isFeatured: product.isFeatured,
      status: product.status,
      sortOrder: product.sortOrder,
      mainImage: product.mainImage || "",
    });
    document.getElementById("product-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleToggleStatus(product: ProductAdminRow) {
    const newStatus = product.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/v1/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setToast(`“${product.title}” durumu ${newStatus === "PUBLISHED" ? "Yayında" : "Taslak"} olarak güncellendi.`);
        loadData();
      }
    } catch {
      setToast("Durum güncellenirken hata oluştu.");
    }
  }

  async function handleToggleFeatured(product: ProductAdminRow) {
    try {
      const res = await fetch(`/api/v1/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });
      if (res.ok) {
        setToast(`“${product.title}” vitrin durumu güncellendi.`);
        loadData();
      }
    } catch {
      setToast("Vitrin durumu güncellenirken hata oluştu.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/v1/admin/products/${deleteTarget.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        setToast(payload.error?.message || "Ürün silinemedi.");
        return;
      }

      setToast("Ürün başarıyla silindi/arşivlendi.");
      if (form.id === deleteTarget.id) openNewForm();
      setDeleteTarget(null);
      loadData();
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
    const url = isEdit ? `/api/v1/admin/products/${form.id}` : "/api/v1/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const parseLines = (text: string) =>
      text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

    try {
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          code: form.code.trim(),
          title: form.title.trim(),
          slug: form.slug.trim() || createSlug(form.title),
          categoryId: form.categoryId,
          shortDescription: form.shortDescription.trim(),
          description: form.description.trim(),
          technicalDetails: parseLines(form.technicalDetails),
          usageAreas: parseLines(form.usageAreas),
          applicationSteps: parseLines(form.applicationSteps),
          isFeatured: form.isFeatured,
          status: form.status,
          sortOrder: Number(form.sortOrder) || 0,
          mainImageUrl: form.mainImage.trim() || undefined,
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

      setToast(isEdit ? "Ürün başarıyla güncellendi." : "Yeni ürün başarıyla eklendi.");
      openNewForm();
      loadData();
    } catch {
      setToast("Sunucu ile iletişim kurulamadı.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Ürün Yönetimi"
        description="Ürün kayıtlarını, teknik detayları, uygulama adımlarını ve vitrin durumlarını yönetin."
        action={
          <button
            type="button"
            onClick={openNewForm}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-xs font-black text-white hover:bg-red-700"
          >
            <Plus size={15} /> Yeni Ürün Ekle
          </button>
        }
      />

      <main className="p-4 sm:p-6 xl:p-8">
        <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.65fr)]">
          {/* Table section */}
          <div>
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative w-full max-w-xs">
                  <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Kod, ürün adı ara..."
                    className="w-full rounded-xl border border-brand-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50"
                  />
                </div>

                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-brand-line bg-white py-2.5 px-3 text-xs font-bold text-slate-700 outline-none focus:border-brand-red"
                  >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="inline-flex self-start rounded-xl border border-brand-line bg-white p-1">
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
              title="Ürünler"
              description={`${filteredRows.length} ürün listeleniyor`}
              headers={["Kod", "Ürün Adı", "Kategori", "Vitrin", "Durum", "İşlemler"]}
              minWidth="800px"
            >
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                    <p className="mt-2 text-xs">Ürünler yükleniyor...</p>
                  </td>
                </tr>
              ) : paginatedRows.length ? (
                paginatedRows.map((prod) => (
                  <tr key={prod.id} className="transition hover:bg-slate-50/70">
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs font-bold text-brand-red">{prod.code}</td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-brand-navy">{prod.title}</p>
                      <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-slate-500">{prod.shortDescription}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-600">{prod.categoryTitle}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(prod)}
                        title="Vitrini aç/kapat"
                        className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                          prod.isFeatured ? "bg-amber-50 text-amber-500 hover:bg-amber-100" : "text-slate-300 hover:text-slate-500"
                        }`}
                      >
                        <Star size={16} fill={prod.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(prod)}
                        title="Durumu değiştirmek için tıklayın"
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-black transition ${
                          prod.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {prod.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(prod)}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line text-slate-600 transition hover:border-brand-navy hover:text-brand-navy"
                          title="Düzenle"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(prod)}
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
                <AdminEmptyRow colSpan={6} message="Arama kriterine uygun ürün bulunamadı." />
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
            id="product-form"
            className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm 2xl:sticky 2xl:top-6"
          >
            <div className="flex items-center justify-between border-b border-brand-line bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">
                  {form.id ? "Düzenleme Modu" : "Yeni Ürün Kaydı"}
                </p>
                <h2 className="mt-0.5 text-base font-black text-brand-navy">
                  {form.id ? "Ürünü Güncelle" : "Yeni Ürün Ekle"}
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

            <form onSubmit={handleSubmit} className="grid gap-4 p-5 max-h-[calc(100vh-140px)] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <AdminFormField label="Ürün Kodu" htmlFor="p-code" required error={fieldErrors.code?.[0]}>
                  <input
                    id="p-code"
                    value={form.code}
                    onChange={(e) => setForm((c) => ({ ...c, code: e.target.value.toUpperCase() }))}
                    placeholder="RH-Z-001"
                    required
                    className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 font-mono text-xs uppercase outline-none focus:border-brand-red"
                  />
                </AdminFormField>

                <AdminFormField label="Kategori" htmlFor="p-cat" required error={fieldErrors.categoryId?.[0]}>
                  <select
                    id="p-cat"
                    value={form.categoryId}
                    onChange={(e) => setForm((c) => ({ ...c, categoryId: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs font-bold outline-none focus:border-brand-red"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </AdminFormField>
              </div>

              <AdminFormField label="Ürün Adı" htmlFor="p-title" required error={fieldErrors.title?.[0]}>
                <input
                  id="p-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((c) => ({
                      ...c,
                      title: e.target.value,
                      slug: c.id ? c.slug : createSlug(e.target.value),
                    }))
                  }
                  placeholder="Standart Sistem Akrilik Zemin Kaplaması"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField label="Slug (URL)" htmlFor="p-slug" required error={fieldErrors.slug?.[0]}>
                <input
                  id="p-slug"
                  value={form.slug}
                  onChange={(e) => setForm((c) => ({ ...c, slug: e.target.value }))}
                  placeholder="standart-sistem-akrilik-zemin"
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-2.5 font-mono text-xs outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField label="Kısa Açıklama (Özet)" htmlFor="p-short" required error={fieldErrors.shortDescription?.[0]}>
                <textarea
                  id="p-short"
                  value={form.shortDescription}
                  onChange={(e) => setForm((c) => ({ ...c, shortDescription: e.target.value }))}
                  rows={2}
                  placeholder="Katalog kartlarında görünecek 1-2 cümlelik özet..."
                  required
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField label="Detaylı Ürün Açıklaması" htmlFor="p-desc" required error={fieldErrors.description?.[0]}>
                <textarea
                  id="p-desc"
                  value={form.description}
                  onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                  rows={4}
                  placeholder="Ürünün detaylı teknik ve operasyonel tanıtımı..."
                  required
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField
                label="Teknik Özellikler"
                htmlFor="p-tech"
                hint="Her satıra bir özellik yazın."
              >
                <textarea
                  id="p-tech"
                  value={form.technicalDetails}
                  onChange={(e) => setForm((c) => ({ ...c, technicalDetails: e.target.value }))}
                  rows={3}
                  placeholder="2-3 mm katman kalınlığı&#10;%100 saf akrilik reçine&#10;UV dayanımı"
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-xs outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField
                label="Kullanım Alanları"
                htmlFor="p-areas"
                hint="Her satıra bir alan yazın."
              >
                <textarea
                  id="p-areas"
                  value={form.usageAreas}
                  onChange={(e) => setForm((c) => ({ ...c, usageAreas: e.target.value }))}
                  rows={3}
                  placeholder="Açık ve kapalı tenis kortları&#10;Basketbol sahaları&#10;Okul bahçeleri"
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-xs outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <AdminFormField
                label="Uygulama Adımları"
                htmlFor="p-steps"
                hint="Her satıra bir adım yazın."
              >
                <textarea
                  id="p-steps"
                  value={form.applicationSteps}
                  onChange={(e) => setForm((c) => ({ ...c, applicationSteps: e.target.value }))}
                  rows={3}
                  placeholder="Zemin temizliği ve nem kontrolü&#10;Astar kat uygulaması&#10;Akrilik son kat ve çizgileme"
                  className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-2.5 text-xs outline-none focus:border-brand-red"
                />
              </AdminFormField>

              <div>
                <span className="mb-2 block text-xs font-bold text-brand-navy">Ürün Ana Görseli</span>
                <MediaUploader
                  value={form.mainImage}
                  onChange={(url) => setForm((c) => ({ ...c, mainImage: url }))}
                  label="Ürün Görseli Seçin"
                  helper="PNG, JPG veya WebP · maks. 10 MB"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AdminFormField label="Yayın Durumu" htmlFor="p-status">
                  <select
                    id="p-status"
                    value={form.status}
                    onChange={(e) => setForm((c) => ({ ...c, status: e.target.value as any }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs font-bold outline-none focus:border-brand-red"
                  >
                    <option value="PUBLISHED">Yayında</option>
                    <option value="DRAFT">Taslak</option>
                    <option value="ARCHIVED">Arşivlendi</option>
                  </select>
                </AdminFormField>

                <AdminFormField label="Sıralama" htmlFor="p-order">
                  <input
                    id="p-order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm((c) => ({ ...c, sortOrder: Number(e.target.value) || 0 }))}
                    className="w-full rounded-xl border border-brand-line px-3 py-2.5 text-xs outline-none focus:border-brand-red"
                  />
                </AdminFormField>
              </div>

              <div className="rounded-xl border border-brand-line bg-slate-50 p-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm((c) => ({ ...c, isFeatured: e.target.checked }))}
                    className="h-4 w-4 rounded text-brand-red accent-brand-red"
                  />
                  <span className="text-xs font-bold text-brand-navy">Bu ürünü Ana Sayfa Vitrininde Göster</span>
                </label>
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
                  {form.id ? "Ürünü Güncelle" : "Ürünü Kaydet"}
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
        title="Ürünü Sil"
        description={
          deleteTarget ? (
            <p>
              <strong className="font-bold text-brand-navy">[{deleteTarget.code}] {deleteTarget.title}</strong> ürününü
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
