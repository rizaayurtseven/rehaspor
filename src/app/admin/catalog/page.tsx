"use client";

import { BookOpen, CheckCircle2, Clock3, ExternalLink, FileText, Languages, Save } from "lucide-react";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminToast } from "@/components/admin/AdminToast";
import { ImageUploaderPlaceholder } from "@/components/admin/ImageUploaderPlaceholder";
import { catalogs } from "@/data/catalogs";

export default function AdminCatalogPage() {
  const [toast, setToast] = useState("");

  return (
    <>
      <AdminHeader title="E-Katalog Yönetimi" description="Türkçe ve İngilizce PDF katalog dosyalarını kontrol edin ve yeni sürüm yükleme akışını deneyin." />
      <main className="p-4 sm:p-6 xl:p-8">
        <section className="mb-6 overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-card sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-red-400"><BookOpen size={23} /></span><div><p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-400">Katalog merkezi</p><h2 className="mt-1 text-xl font-black">PDF dosyalarınızı güncel tutun</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Yüklenen dosyalar, public sitedeki E-Katalog sayfasında görüntüleme ve indirme bağlantıları için kullanılacaktır.</p></div></div>
          <span className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-black text-emerald-300 sm:mt-0"><CheckCircle2 size={14} /> Sistem hazır</span>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {catalogs.map((catalog) => (
            <article key={catalog.id} className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-brand-line p-5">
                <div className="flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-50 text-brand-red">{catalog.language === "TR" ? <FileText size={21} /> : <Languages size={21} />}</span><div><span className="inline-flex rounded-full bg-brand-navy px-2 py-0.5 text-[10px] font-black tracking-wider text-white">{catalog.language}</span><h2 className="mt-1.5 text-lg font-black text-brand-navy">{catalog.title}</h2></div></div>
                <span className={catalog.language === "TR" ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700" : "rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-black text-amber-700"}>{catalog.language === "TR" ? "Yayında" : "Placeholder"}</span>
              </div>
              <div className="p-5">
                <p className="min-h-12 text-sm leading-6 text-slate-600">{catalog.description}</p>
                <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 sm:grid-cols-2"><span className="flex items-center gap-2"><FileText size={14} className="text-brand-red" /> PDF dokümanı</span><span className="flex items-center gap-2 sm:justify-end"><Clock3 size={14} className="text-brand-red" /> Son kontrol: 10.07.2026</span></div>
                <div className="mt-5"><ImageUploaderPlaceholder label={`${catalog.language} katalog PDF'i`} helper="PDF · maksimum 25 MB" accept="application/pdf" /></div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button type="button" onClick={() => setToast(`${catalog.language} katalog değişikliği demo olarak kaydedildi.`)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-black text-white hover:bg-red-700"><Save size={16} /> Değişikliği kaydet</button>
                  <a href={catalog.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line px-4 py-3 text-sm font-black text-brand-navy hover:border-brand-navy"><ExternalLink size={16} /> Mevcut PDF</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
          <p className="text-sm font-black text-blue-900">Backend entegrasyonu notu</p>
          <p className="mt-1 text-xs leading-6 text-blue-800/70">Bu yükleme alanları şu anda dosya seçimini arayüzde gösteren mock akışlardır. Dosya depolama servisi bağlandığında aynı ekran üzerinden gerçek sürümleme ve yayınlama işlemleri yapılabilir.</p>
        </div>
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
