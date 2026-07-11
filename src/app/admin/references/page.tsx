"use client";

import { MapPin, Pencil, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AdminEmptyRow } from "@/components/admin/AdminEmptyRow";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";
import { references as referenceData } from "@/data/references";

type ReferenceAdminRow = {
  id: string;
  title: string;
  city: string;
  year: number;
  category: string;
  description: string;
};

type ReferenceFormValues = Omit<ReferenceAdminRow, "year"> & { year: string };

const emptyForm: ReferenceFormValues = { id: "", title: "", city: "", year: String(new Date().getFullYear()), category: "Zemin Uygulaması", description: "" };
const initialReferences: ReferenceAdminRow[] = referenceData.map((reference) => ({
  id: reference.id,
  title: reference.title,
  city: reference.city,
  year: reference.year,
  category: reference.category,
  description: reference.description,
}));

const projectCategories = ["Zemin Uygulaması", "Spor Ekipmanları", "Padel Court", "Saha Yenileme"];

export default function AdminReferencesPage() {
  const [rows, setRows] = useState<ReferenceAdminRow[]>(initialReferences);
  const [form, setForm] = useState<ReferenceFormValues>(emptyForm);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    if (!normalizedQuery) return rows;
    return rows.filter((reference) => `${reference.title} ${reference.city} ${reference.category}`.toLocaleLowerCase("tr-TR").includes(normalizedQuery));
  }, [query, rows]);

  function openNewForm() {
    setForm(emptyForm);
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleEdit(reference: ReferenceAdminRow) {
    setForm({ ...reference, year: String(reference.year) });
    document.getElementById("reference-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDelete(reference: ReferenceAdminRow) {
    if (!window.confirm(`“${reference.title}” referansını demo listesinden silmek istiyor musunuz?`)) return;
    setRows((current) => current.filter((item) => item.id !== reference.id));
    if (form.id === reference.id) setForm(emptyForm);
    setToast("Referans proje demo listesinden kaldırıldı.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextReference: ReferenceAdminRow = {
      id: form.id || `reference-${Date.now()}`,
      title: form.title.trim(),
      city: form.city.trim(),
      year: Number(form.year),
      category: form.category,
      description: form.description.trim(),
    };
    if (form.id) {
      setRows((current) => current.map((row) => (row.id === form.id ? nextReference : row)));
      setToast("Referans proje güncellendi.");
    } else {
      setRows((current) => [nextReference, ...current]);
      setToast("Yeni referans proje demo listesine eklendi.");
    }
    setForm(emptyForm);
  }

  return (
    <>
      <AdminHeader title="Referanslar" description="Tamamlanan projeleri şehir, yıl ve uygulama kategorisiyle birlikte yönetin." action={<button type="button" onClick={openNewForm} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-black text-white hover:bg-red-700"><Plus size={17} /> Yeni referans</button>} />
      <main className="grid grid-cols-1 items-start gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:p-8">
        <div className="min-w-0">
          <div className="relative mb-4 max-w-md"><Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Proje veya şehir ara..." className="w-full rounded-xl border border-brand-line bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-red-50" /></div>
          <AdminTable title="Referans proje listesi" description={`${filteredRows.length} proje gösteriliyor`} headers={["Proje", "Konum", "Yıl", "Kategori", "İşlem"]} minWidth="820px">
            {filteredRows.length ? filteredRows.map((reference) => (
              <tr key={reference.id} className="transition hover:bg-slate-50/70">
                <td className="max-w-sm px-5 py-4"><p className="font-black text-brand-navy">{reference.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{reference.description}</p></td>
                <td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600"><MapPin size={14} className="text-brand-red" />{reference.city}</span></td>
                <td className="px-5 py-4 font-black text-brand-navy">{reference.year}</td>
                <td className="px-5 py-4"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{reference.category}</span></td>
                <td className="px-5 py-4"><div className="flex gap-1.5"><button type="button" onClick={() => handleEdit(reference)} className="grid h-9 w-9 place-items-center rounded-lg border border-brand-line text-slate-500 hover:border-brand-navy hover:text-brand-navy" aria-label={`${reference.title} referansını düzenle`}><Pencil size={15} /></button><button type="button" onClick={() => handleDelete(reference)} className="grid h-9 w-9 place-items-center rounded-lg border border-red-100 text-brand-red hover:bg-red-50" aria-label={`${reference.title} referansını sil`}><Trash2 size={15} /></button></div></td>
              </tr>
            )) : <AdminEmptyRow colSpan={5} />}
          </AdminTable>
        </div>

        <aside id="reference-form" className="scroll-mt-24 rounded-2xl border border-brand-line bg-white shadow-sm xl:sticky xl:top-6">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4"><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">{form.id ? "Düzenleme modu" : "Yeni kayıt"}</p><h2 className="mt-1 font-black text-brand-navy">{form.id ? "Referansı düzenle" : "Referans ekle"}</h2></div>{form.id ? <button type="button" onClick={() => setForm(emptyForm)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-50" aria-label="Düzenlemeyi iptal et"><X size={18} /></button> : null}</div>
          <form className="grid gap-4 p-5" onSubmit={handleSubmit}>
            <AdminFormField label="Proje adı" required><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required placeholder="Proje başlığı" className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red" /></AdminFormField>
            <div className="grid grid-cols-2 gap-3"><AdminFormField label="Şehir" required><input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} required placeholder="Ankara" className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red" /></AdminFormField><AdminFormField label="Yıl" required><input type="number" min="2000" max="2100" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))} required className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red" /></AdminFormField></div>
            <AdminFormField label="Proje kategorisi" required><select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="w-full rounded-xl border border-brand-line bg-white px-3.5 py-3 text-sm outline-none focus:border-brand-red">{projectCategories.map((category) => <option key={category}>{category}</option>)}</select></AdminFormField>
            <AdminFormField label="Açıklama" required><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required rows={4} placeholder="Uygulama kapsamını kısaca anlatın" className="w-full resize-none rounded-xl border border-brand-line px-3.5 py-3 text-sm leading-6 outline-none focus:border-brand-red" /></AdminFormField>
            <ImageUploaderPlaceholder label="Proje görseli" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white hover:bg-red-700"><Save size={16} /> {form.id ? "Değişiklikleri kaydet" : "Referansı ekle"}</button>
          </form>
        </aside>
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
