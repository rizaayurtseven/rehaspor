"use client";

import { Filter, Pencil, Plus, Save, Search, Star, Trash2, X, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";

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

export default function AdminProductsPage() {
  const [rows, setRows] = useState<ProductAdminRow[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [form, setForm] = useState<ProductFormValues>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toast, setToast] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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
      const matchesQuery = !normalizedQuery || `${product.code} ${product.title} ${product.shortDescription}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [categoryFilter, query, rows]);

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
    });
    document.getElementById("product-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleDelete(product: ProductAdminRow) {
    if (!window.confirm(`“${product.title}” ürününü silmek/arşivlemek istiyor musunuz?`)) return;

    try {
      const res = await fetch(`/api/v1/admin/products/${product.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        alert(payload.error?.message || "Ürün silinemedi.");
        return;
      }

      setToast("Ürün başarıyla kaldırıldı.");
      if (form.id === product.id) setForm(emptyForm);
      loadData();
    } catch {
      alert("Sunucuya bağlanılamadı.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const isEdit = Boolean(form.id);
    const url = isEdit ? `/api/v1/admin/products/${form.id}` : "/api/v1/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    const payloadBody = {
      code: form.code.trim().toUpperCase(),
      title: form.title.trim(),
      slug: form.slug.trim() || createSlug(form.title),
      categoryId: form.categoryId,
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim() || form.shortDescription.trim(),
      isFeatured: form.isFeatured,
      status: form.status,
      sortOrder: Number(form.sortOrder) || 0,
      technicalDetails: form.technicalDetails.split("\n").map((s) => s.trim()).filter(Boolean),
      usageAreas: form.usageAreas.split("\n").map((s) => s.trim()).filter(Boolean),
      applicationSteps: form.applicationSteps.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      const payload = await res.json();

      if (!res.ok) {
        if (payload.error?.fields) {
          setFieldErrors(payload.error.fields);
        } else {
          setToast(payload.error?.message || "Kaydetme başarısız.");
        }
        return;
      }

      setToast(isEdit ? "Ürün güncellendi." : "Yeni ürün eklendi.");
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
        title="Ürünler"
        description="Ürün kataloğunu filtreleyin; teknik içerikleri ve öne çıkan ürün seçimini yönetin."
        action={
          <button type="button" onClick={openNewForm} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-700">
            <Plus size={17} /> Yeni ürün
          </button>
        }
      />

      <main className="grid grid-cols-1 items-start gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:p-8">
        <div className="min-w-0">
          <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_260px]">
            <div className="relative">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ürün kodu veya adına göre ara..."
                className="w-full rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
              />
            </div>
            <div className="relative">
              <Filter size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full appearance-none rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-red"
              >
                <option value="">Tüm kategoriler</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AdminTable
            title="Ürün listesi"
            description={`${filteredRows.length} ürün gösteriliyor`}
            headers={["Kod / Ürün", "Kategori", "Durum", "Vitrin", "İşlem"]}
            minWidth="900px"
          >
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                  <p className="mt-2 text-xs">Ürünler yükleniyor...</p>
                </td>
              </tr>
            ) : filteredRows.length ? (
              filteredRows.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-800 to-brand-navy text-[10px] font-black text-white">
                        {product.code.split("-").at(-1)}
                      </span>
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-[0.1em] text-brand-red">{product.code}</span>
                        <span className="mt-0.5 block max-w-xs font-black text-brand-navy">{product.title}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {product.categoryTitle}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${product.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {product.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {product.isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700">
                        <Star size={12} fill="currentColor" /> Öne çıkan
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Standart</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-brand-line text-slate-500 hover:border-brand-navy hover:text-brand-navy"
                        aria-label={`${product.title} ürününü düzenle`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-brand-red hover:bg-red-50"
                        aria-label={`${product.title} ürününü sil`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <AdminEmptyRow colSpan={5} />
            )}
          </AdminTable>
        </div>

        <aside id="product-form" className="scroll-mt-24 rounded-2xl border border-brand-line bg-white shadow-sm xl:sticky xl:top-6">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">{form.id ? "Düzenleme modu" : "Yeni kayıt"}</p>
              <h2 className="mt-1 font-black text-brand-navy">{form.id ? "Ürünü düzenle" : "Ürün ekle"}</h2>
            </div>
            {form.id ? (
              <button type="button" onClick={openNewForm} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-50" aria-label="Düzenlemeyi iptal et">
                <X size={18} />
              </button>
            ) : null}
          </div>
          <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminFormField label="Ürün kodu" required error={fieldErrors.code?.[0]}>
                <input
                  value={form.code}
                  onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))}
                  required
                  placeholder="RH-Z-009"
                  className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm font-bold outline-none focus:border-brand-red"
                />
              </AdminFormField>
              <AdminFormField label="Kategori" required error={fieldErrors.categoryId?.[0]}>
                <select
                  value={form.categoryId}
                  onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
                  required
                  className="w-full rounded-xl border border-brand-line bg-white px-3.5 py-3 text-sm outline-none focus:border-brand-red"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </AdminFormField>
            </div>
            <AdminFormField label="Ürün başlığı" required error={fieldErrors.title?.[0]}>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value, slug: current.id ? current.slug : createSlug(event.target.value) }))}
                required
                placeholder="Ürün adı"
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <AdminFormField label="Slug (URL)" required error={fieldErrors.slug?.[0]}>
              <input
                value={form.slug}
                onChange={(event) => setForm((current) => ({ ...current, slug: createSlug(event.target.value) }))}
                required
                placeholder="urun-adi-slug"
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 font-mono text-sm outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <AdminFormField label="Yayın Durumu" htmlFor="product-status">
              <select
                id="product-status"
                value={form.status}
                onChange={(e) => setForm((curr) => ({ ...curr, status: e.target.value as any }))}
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red bg-white"
              >
                <option value="PUBLISHED">Yayında (Public sitede görünür)</option>
                <option value="DRAFT">Taslak (Gizli)</option>
              </select>
            </AdminFormField>
            <AdminFormField label="Kısa açıklama" required error={fieldErrors.shortDescription?.[0]}>
              <textarea
                value={form.shortDescription}
                onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))}
                required
                rows={2}
                placeholder="Kartlarda gösterilecek özet"
                className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <AdminFormField label="Detaylı açıklama" required error={fieldErrors.description?.[0]}>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                required
                rows={3}
                placeholder="Ürün detay sayfasında görünecek açıklama"
                className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <AdminFormField label="Teknik özellikler" hint="Her özelliği yeni bir satıra yazın." required>
              <textarea
                value={form.technicalDetails}
                onChange={(event) => setForm((current) => ({ ...current, technicalDetails: event.target.value }))}
                required
                rows={4}
                placeholder={"UV dayanımlı yüzey\nKaymaz doku\nKolay bakım"}
                className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-brand-line p-3.5">
              <span>
                <span className="block text-sm font-bold text-brand-navy">Öne çıkan ürün</span>
                <span className="mt-0.5 block text-xs text-slate-500">Ana sayfa vitrininde göster.</span>
              </span>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) => setForm((current) => ({ ...current, isFeatured: event.target.checked }))}
                className="h-5 w-5 accent-brand-red"
              />
            </label>
            <ImageUploaderPlaceholder label="Ana ürün görseli" />
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {form.id ? "Değişiklikleri kaydet" : "Ürünü ekle"}
              </button>
              {form.id ? (
                <button type="button" onClick={openNewForm} className="rounded-xl border border-brand-line px-4 text-sm font-bold text-slate-600 hover:border-brand-navy">
                  İptal
                </button>
              ) : null}
            </div>
          </form>
        </aside>
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
