"use client";

import { Filter, Pencil, Plus, Save, Search, Star, Trash2, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";
import { categories } from "@/data/categories";
import { products as productData } from "@/data/products";

type ProductAdminRow = {
  id: string;
  code: string;
  title: string;
  categorySlug: string;
  shortDescription: string;
  technicalDetails: string[];
  isFeatured: boolean;
};

type ProductFormValues = Omit<ProductAdminRow, "technicalDetails"> & { technicalDetails: string };

const emptyForm: ProductFormValues = {
  id: "",
  code: "",
  title: "",
  categorySlug: categories[0]?.slug ?? "",
  shortDescription: "",
  technicalDetails: "",
  isFeatured: false,
};

const initialProducts: ProductAdminRow[] = productData.map((product) => ({
  id: product.id,
  code: product.code,
  title: product.title,
  categorySlug: product.categorySlug,
  shortDescription: product.shortDescription,
  technicalDetails: product.technicalDetails,
  isFeatured: product.isFeatured,
}));

export default function AdminProductsPage() {
  const [rows, setRows] = useState<ProductAdminRow[]>(initialProducts);
  const [form, setForm] = useState<ProductFormValues>(emptyForm);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toast, setToast] = useState("");

  const categoryNames = useMemo(() => new Map(categories.map((category) => [category.slug, category.title])), []);
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter((product) => {
      const matchesCategory = !categoryFilter || product.categorySlug === categoryFilter;
      const matchesQuery = !normalizedQuery || `${product.code} ${product.title} ${product.shortDescription}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [categoryFilter, query, rows]);

  function openNewForm() {
    setForm(emptyForm);
    document.getElementById("product-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEdit(product: ProductAdminRow) {
    setForm({ ...product, technicalDetails: product.technicalDetails.join("\n") });
    document.getElementById("product-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDelete(product: ProductAdminRow) {
    if (!window.confirm(`“${product.title}” ürününü demo listesinden silmek istiyor musunuz?`)) return;
    setRows((current) => current.filter((item) => item.id !== product.id));
    if (form.id === product.id) setForm(emptyForm);
    setToast("Ürün demo listesinden kaldırıldı.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextProduct: ProductAdminRow = {
      id: form.id || `product-${Date.now()}`,
      code: form.code.trim().toLocaleUpperCase("tr-TR"),
      title: form.title.trim(),
      categorySlug: form.categorySlug,
      shortDescription: form.shortDescription.trim(),
      technicalDetails: form.technicalDetails.split("\n").map((item) => item.trim()).filter(Boolean),
      isFeatured: form.isFeatured,
    };

    if (form.id) {
      setRows((current) => current.map((row) => (row.id === form.id ? nextProduct : row)));
      setToast("Ürün bilgileri güncellendi.");
    } else {
      setRows((current) => [nextProduct, ...current]);
      setToast("Yeni ürün demo listesine eklendi.");
    }
    setForm(emptyForm);
  }

  return (
    <>
      <AdminHeader
        title="Ürünler"
        description="Ürün kataloğunu filtreleyin; teknik içerikleri ve öne çıkan ürün seçimini yönetin."
        action={<button type="button" onClick={openNewForm} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-700"><Plus size={17} /> Yeni ürün</button>}
      />

      <main className="grid grid-cols-1 items-start gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:p-8">
        <div className="min-w-0">
          <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_260px]">
            <div className="relative">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ürün kodu veya adına göre ara..." className="w-full rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50" />
            </div>
            <div className="relative">
              <Filter size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="w-full appearance-none rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-brand-red">
                <option value="">Tüm kategoriler</option>
                {categories.map((category) => <option key={category.id} value={category.slug}>{category.title}</option>)}
              </select>
            </div>
          </div>

          <AdminTable title="Ürün listesi" description={`${filteredRows.length} ürün gösteriliyor`} headers={["Kod / Ürün", "Kategori", "Teknik", "Vitrin", "İşlem"]} minWidth="900px">
            {filteredRows.length ? filteredRows.map((product) => (
              <tr key={product.id} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-800 to-brand-navy text-[10px] font-black text-white">{product.code.split("-").at(-1)}</span>
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.1em] text-brand-red">{product.code}</span>
                      <span className="mt-0.5 block max-w-xs font-black text-brand-navy">{product.title}</span>
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{categoryNames.get(product.categorySlug) ?? product.categorySlug}</span></td>
                <td className="px-5 py-4 text-xs font-semibold text-slate-500">{product.technicalDetails.length} madde</td>
                <td className="px-5 py-4">{product.isFeatured ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700"><Star size={12} fill="currentColor" /> Öne çıkan</span> : <span className="text-xs text-slate-400">Standart</span>}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => handleEdit(product)} className="grid h-9 w-9 place-items-center rounded-lg border border-brand-line text-slate-500 hover:border-brand-navy hover:text-brand-navy" aria-label={`${product.title} ürününü düzenle`}><Pencil size={15} /></button>
                    <button type="button" onClick={() => handleDelete(product)} className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-brand-red hover:bg-red-50" aria-label={`${product.title} ürününü sil`}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            )) : <AdminEmptyRow colSpan={5} />}
          </AdminTable>
        </div>

        <aside id="product-form" className="scroll-mt-24 rounded-2xl border border-brand-line bg-white shadow-sm xl:sticky xl:top-6">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">{form.id ? "Düzenleme modu" : "Yeni kayıt"}</p><h2 className="mt-1 font-black text-brand-navy">{form.id ? "Ürünü düzenle" : "Ürün ekle"}</h2></div>
            {form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-50" aria-label="Düzenlemeyi iptal et"><X size={18} /></button> : null}
          </div>
          <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              <AdminFormField label="Ürün kodu" required><input value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} required placeholder="RH-Z-009" className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm font-bold outline-none focus:border-brand-red" /></AdminFormField>
              <AdminFormField label="Kategori" required><select value={form.categorySlug} onChange={(event) => setForm((current) => ({ ...current, categorySlug: event.target.value }))} required className="w-full rounded-xl border border-brand-line bg-white px-3.5 py-3 text-sm outline-none focus:border-brand-red">{categories.map((category) => <option key={category.id} value={category.slug}>{category.title}</option>)}</select></AdminFormField>
            </div>
            <AdminFormField label="Ürün başlığı" required><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required placeholder="Ürün adı" className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red" /></AdminFormField>
            <AdminFormField label="Kısa açıklama" required><textarea value={form.shortDescription} onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))} required rows={3} placeholder="Kartlarda gösterilecek özet" className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red" /></AdminFormField>
            <AdminFormField label="Teknik özellikler" hint="Her özelliği yeni bir satıra yazın." required><textarea value={form.technicalDetails} onChange={(event) => setForm((current) => ({ ...current, technicalDetails: event.target.value }))} required rows={5} placeholder={"UV dayanımlı yüzey\nKaymaz doku\nKolay bakım"} className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red" /></AdminFormField>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-brand-line p-3.5">
              <span><span className="block text-sm font-bold text-brand-navy">Öne çıkan ürün</span><span className="mt-0.5 block text-xs text-slate-500">Ana sayfa vitrininde göster.</span></span>
              <input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm((current) => ({ ...current, isFeatured: event.target.checked }))} className="h-5 w-5 accent-brand-red" />
            </label>
            <ImageUploaderPlaceholder label="Ana ürün görseli" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white hover:bg-red-700"><Save size={16} /> {form.id ? "Değişiklikleri kaydet" : "Ürünü ekle"}</button>
          </form>
        </aside>
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
