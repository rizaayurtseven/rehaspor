"use client";

import { MapPin, Pencil, Plus, Save, Search, Trash2, X, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";

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
};

const projectCategories = ["Zemin Uygulaması", "Spor Ekipmanları", "Padel Court", "Saha Yenileme"];

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
  const [toast, setToast] = useState("");

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
    if (!normalizedQuery) return rows;
    return rows.filter((reference) =>
      `${reference.title} ${reference.city} ${reference.category}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
    );
  }, [query, rows]);

  function openNewForm() {
    setForm(emptyForm);
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEdit(reference: ReferenceAdminRow) {
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
    });
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleDelete(reference: ReferenceAdminRow) {
    if (!window.confirm(`“${reference.title}” referansını silmek istiyor musunuz?`)) return;

    try {
      const res = await fetch(`/api/v1/admin/references/${reference.id}`, { method: "DELETE" });
      const payload = await res.json();

      if (!res.ok) {
        alert(payload.error?.message || "Referans silinemedi.");
        return;
      }

      setToast("Referans proje kaldırıldı.");
      if (form.id === reference.id) setForm(emptyForm);
      loadReferences();
    } catch {
      alert("Sunucuya bağlanılamadı.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

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
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        setToast(payload.error?.message || "Kaydetme başarısız.");
        return;
      }

      setToast(isEdit ? "Referans güncellendi." : "Yeni referans eklendi.");
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
        title="Referanslar"
        description="Tamamlanan projeleri şehir, yıl ve uygulama kategorisiyle birlikte yönetin."
        action={
          <button type="button" onClick={openNewForm} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-black text-white hover:bg-red-700">
            <Plus size={17} /> Yeni referans
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
              placeholder="Proje veya şehir ara..."
              className="w-full rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
            />
          </div>
          <AdminTable
            title="Referans proje listesi"
            description={`${filteredRows.length} proje gösteriliyor`}
            headers={["Proje", "Konum", "Yıl", "Durum", "Kategori", "İşlem"]}
            minWidth="820px"
          >
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                  <p className="mt-2 text-xs">Referanslar yükleniyor...</p>
                </td>
              </tr>
            ) : filteredRows.length ? (
              filteredRows.map((reference) => (
                <tr key={reference.id} className="transition hover:bg-slate-50/70">
                  <td className="max-w-sm px-5 py-4">
                    <p className="font-black text-brand-navy">{reference.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{reference.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                      <MapPin size={14} className="text-brand-red" />
                      {reference.city}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-black text-brand-navy">{reference.year}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${reference.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {reference.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{reference.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(reference)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-brand-line text-slate-500 hover:border-brand-navy hover:text-brand-navy"
                        aria-label={`${reference.title} referansını düzenle`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(reference)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-brand-red hover:bg-red-50"
                        aria-label={`${reference.title} referansını sil`}
                      >
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

        <aside id="reference-form" className="scroll-mt-24 rounded-2xl border border-brand-line bg-white shadow-sm xl:sticky xl:top-6">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">{form.id ? "Düzenleme modu" : "Yeni kayıt"}</p>
              <h2 className="mt-1 font-black text-brand-navy">{form.id ? "Referansı düzenle" : "Referans ekle"}</h2>
            </div>
            {form.id ? (
              <button type="button" onClick={openNewForm} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-50" aria-label="Düzenlemeyi iptal et">
                <X size={18} />
              </button>
            ) : null}
          </div>
          <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
            <AdminFormField label="Proje adı" required>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value, slug: current.id ? current.slug : createSlug(event.target.value) }))}
                required
                placeholder="Proje başlığı"
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <div className="grid grid-cols-2 gap-3">
              <AdminFormField label="Şehir" required>
                <input
                  value={form.city}
                  onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                  required
                  placeholder="Ankara"
                  className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>
              <AdminFormField label="Yıl" required>
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  value={form.year}
                  onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
                  required
                  className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
                />
              </AdminFormField>
            </div>
            <AdminFormField label="Proje kategorisi" required>
              <select
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-xl border border-brand-line bg-white px-3.5 py-3 text-sm outline-none focus:border-brand-red"
              >
                {projectCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </AdminFormField>
            <AdminFormField label="Yayın Durumu" htmlFor="ref-status">
              <select
                id="ref-status"
                value={form.status}
                onChange={(e) => setForm((curr) => ({ ...curr, status: e.target.value as any }))}
                className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red bg-white"
              >
                <option value="PUBLISHED">Yayında (Public sitede görünür)</option>
                <option value="DRAFT">Taslak (Gizli)</option>
              </select>
            </AdminFormField>
            <AdminFormField label="Açıklama" required>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                required
                rows={4}
                placeholder="Uygulama kapsamını kısaca anlatın"
                className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red"
              />
            </AdminFormField>
            <ImageUploaderPlaceholder label="Proje görseli" />
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {form.id ? "Değişiklikleri kaydet" : "Referansı ekle"}
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
