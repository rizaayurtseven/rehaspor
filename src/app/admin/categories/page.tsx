"use client";

import { Pencil, Plus, Save, Search, Trash2, X, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";

type CategoryAdminRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  productCount: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
};

type CategoryFormValues = Omit<CategoryAdminRow, "productCount">;

const emptyForm: CategoryFormValues = {
  id: "",
  title: "",
  slug: "",
  description: "",
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

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryAdminRow[]>([]);
  const [form, setForm] = useState<CategoryFormValues>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

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
    if (!normalizedQuery) return rows;
    return rows.filter((category) =>
      `${category.title} ${category.slug} ${category.description}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
    );
  }, [query, rows]);

  function resetForm() {
    setForm(emptyForm);
    setFieldErrors({});
    document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    });
    document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleDelete(category: CategoryAdminRow) {
    if (!window.confirm(`“${category.title}” kategorisini silmek/arşivlemek istiyor musunuz?`)) return;

    try {
      const res = await fetch(`/api/v1/admin/categories/${category.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        alert(payload.error?.message || "Kategori silinemedi.");
        return;
      }

      setToast("Kategori başarıyla kaldırıldı.");
      if (form.id === category.id) resetForm();
      loadCategories();
    } catch {
      alert("Sunucuya bağlanılamadı.");
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
        }),
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

      setToast(isEdit ? "Kategori güncellendi." : "Yeni kategori eklendi.");
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
        title="Kategoriler"
        description="Ürün gruplarını, açıklamalarını ve katalogdaki görünüm sırasını yönetin."
        action={
          <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-700">
            <Plus size={17} /> Yeni kategori
          </button>
        }
      />

      <main className="grid grid-cols-1 items-start gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:p-8">
        <div className="min-w-0">
          <div className="relative mb-4 max-w-md">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kategori ara..."
              className="w-full rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
            />
          </div>

          <AdminTable
            title="Kategori listesi"
            description={`${filteredRows.length} kategori gösteriliyor`}
            headers={["Kategori", "Slug", "Ürün", "Durum", "Açıklama", "İşlem"]}
            minWidth="900px"
          >
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                  <p className="mt-2 text-xs">Kategoriler yükleniyor...</p>
                </td>
              </tr>
            ) : filteredRows.length ? (
              filteredRows.map((category) => (
                <tr key={category.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-navy text-sm font-black text-white">{category.title.charAt(0)}</span>
                      <span className="font-black text-brand-navy">{category.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{category.slug}</code></td>
                  <td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">{category.productCount}</span></td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${category.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {category.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="max-w-sm px-5 py-4 text-xs leading-5 text-slate-500">{category.description}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => handleEdit(category)} className="grid h-9 w-9 place-items-center rounded-lg border border-brand-line text-slate-500 transition hover:border-brand-navy hover:text-brand-navy" aria-label={`${category.title} kategorisini düzenle`}>
                        <Pencil size={15} />
                      </button>
                      <button type="button" onClick={() => handleDelete(category)} className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-brand-red transition hover:bg-red-50" aria-label={`${category.title} kategorisini sil`}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <AdminEmptyRow colSpan={6} />
            )}
          </AdminTable>
        </div>

        <aside id="category-form" className="scroll-mt-24 rounded-2xl border border-brand-line bg-white shadow-sm xl:sticky xl:top-6">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">{form.id ? "Düzenleme modu" : "Yeni kayıt"}</p>
              <h2 className="mt-1 font-black text-brand-navy">{form.id ? "Kategoriyi düzenle" : "Kategori ekle"}</h2>
            </div>
            {form.id ? (
              <button type="button" onClick={resetForm} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-brand-navy" aria-label="Düzenlemeyi iptal et"><X size={18} /></button>
            ) : null}
          </div>
          <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
            <AdminFormField label="Kategori adı" htmlFor="category-title" required error={fieldErrors.title?.[0]}>
              <input id="category-title" value={form.title} onChange={handleTitleChange} required placeholder="Örn. Zemin Kaplamaları" className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red" />
            </AdminFormField>
            <AdminFormField label="Slug" htmlFor="category-slug" hint="URL adresinde kullanılacak benzersiz kısa ad." required error={fieldErrors.slug?.[0]}>
              <input id="category-slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: createSlug(event.target.value) }))} required placeholder="zemin-kaplamalari" className="w-full rounded-xl border border-brand-line px-3.5 py-3 font-mono text-sm outline-none focus:border-brand-red" />
            </AdminFormField>
            <AdminFormField label="Yayın Durumu" htmlFor="category-status">
              <select
                id="category-status"
                value={form.status}
                onChange={(e) => setForm((curr) => ({ ...curr, status: e.target.value as any }))}
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red bg-white"
              >
                <option value="PUBLISHED">Yayında (Public sitede görünür)</option>
                <option value="DRAFT">Taslak (Gizli)</option>
              </select>
            </AdminFormField>
            <AdminFormField label="Sıralama (Order)" htmlFor="category-sort">
              <input
                id="category-sort"
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((curr) => ({ ...curr, sortOrder: parseInt(e.target.value, 10) || 0 }))}
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <AdminFormField label="Kısa açıklama" htmlFor="category-description" required error={fieldErrors.description?.[0]}>
              <textarea id="category-description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required rows={4} placeholder="Kategori kartında gösterilecek açıklama" className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red" />
            </AdminFormField>
            <ImageUploaderPlaceholder label="Kategori görseli" />
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saving} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {form.id ? "Değişiklikleri kaydet" : "Kategoriyi ekle"}
              </button>
              {form.id ? <button type="button" onClick={resetForm} className="rounded-xl border border-brand-line px-4 text-sm font-bold text-slate-600 hover:border-brand-navy">İptal</button> : null}
            </div>
          </form>
        </aside>
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
