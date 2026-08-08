"use client";

import { Clock3, Instagram, Mail, MapPin, MessageCircle, Phone, RotateCcw, Save, Loader2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminToast } from "@/components/admin/AdminToast";

type SettingsForm = {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  instagram: string;
  mapUrl: string;
  workingHours: string;
};

const initialForm: SettingsForm = {
  siteName: "Reha Spor",
  phone: "+90 533 677 14 45",
  email: "info@rehaspor.com.tr",
  address: "İvedik OSB Çağdaş Emek Sanayi Sitesi, 1437. Cadde No:9, Yenimahalle / Ankara",
  whatsapp: "+90 533 677 14 45",
  instagram: "https://www.instagram.com/rehaspor",
  mapUrl: "https://maps.google.com/?q=Ivedik+OSB+1437+Cadde+No+9+Ankara",
  workingHours: "Pazartesi - Cumartesi, 09.00 - 18.00",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/settings");
      const data = await res.json();
      if (res.ok && data.data?.settings) {
        setForm(data.data.settings);
      }
    } catch {
      setToast("Ayarlar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function updateField<Key extends keyof SettingsForm>(key: Key, value: SettingsForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/v1/admin/settings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          siteName: form.siteName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          whatsapp: form.whatsapp,
          instagram: form.instagram,
          mapUrl: form.mapUrl,
          workingHours: form.workingHours,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        setToast(payload.error?.message || "Ayarlar kaydedilemedi.");
        return;
      }

      setToast("Site ayarları başarıyla güncellendi.");
    } catch {
      setToast("Sunucu ile iletişim kurulamadı.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminHeader title="Site Ayarları" description="Public sitede kullanılan iletişim bilgilerini, sosyal medya hesabını ve çalışma saatlerini yönetin." />
      <main className="p-4 sm:p-6 xl:p-8">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-red" />
            <p className="mt-2 text-sm">Site ayarları yükleniyor...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <section className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm">
              <div className="border-b border-brand-line px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">Kurumsal bilgiler</p>
                <h2 className="mt-1 font-black text-brand-navy">İletişim ve bağlantılar</h2>
              </div>
              <div className="grid gap-5 p-5 md:grid-cols-2">
                <AdminFormField label="Site Adı" htmlFor="settings-name" required>
                  <input
                    id="settings-name"
                    value={form.siteName}
                    onChange={(event) => updateField("siteName", event.target.value)}
                    required
                    className="w-full rounded-xl border border-brand-line py-3 px-3.5 text-sm outline-none focus:border-brand-red"
                  />
                </AdminFormField>
                <AdminFormField label="Telefon" htmlFor="settings-phone" required>
                  <div className="relative">
                    <Phone size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="settings-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                </AdminFormField>
                <AdminFormField label="E-posta" htmlFor="settings-email" required>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="settings-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                </AdminFormField>
                <AdminFormField label="WhatsApp" htmlFor="settings-whatsapp" required>
                  <div className="relative">
                    <MessageCircle size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="settings-whatsapp"
                      value={form.whatsapp}
                      onChange={(event) => updateField("whatsapp", event.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                </AdminFormField>
                <AdminFormField label="Instagram" htmlFor="settings-instagram">
                  <div className="relative">
                    <Instagram size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="settings-instagram"
                      type="url"
                      value={form.instagram}
                      onChange={(event) => updateField("instagram", event.target.value)}
                      className="w-full rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                </AdminFormField>
                <div className="md:col-span-2">
                  <AdminFormField label="Adres" htmlFor="settings-address" required>
                    <div className="relative">
                      <MapPin size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                      <textarea
                        id="settings-address"
                        value={form.address}
                        onChange={(event) => updateField("address", event.target.value)}
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm leading-6 outline-none focus:border-brand-red"
                      />
                    </div>
                  </AdminFormField>
                </div>
                <AdminFormField label="Çalışma saatleri" htmlFor="settings-hours" required>
                  <div className="relative">
                    <Clock3 size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="settings-hours"
                      value={form.workingHours}
                      onChange={(event) => updateField("workingHours", event.target.value)}
                      required
                      className="w-full rounded-xl border border-brand-line py-3 pl-10 pr-3.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                </AdminFormField>
                <AdminFormField label="Harita bağlantısı" htmlFor="settings-map">
                  <input
                    id="settings-map"
                    type="url"
                    value={form.mapUrl}
                    onChange={(event) => updateField("mapUrl", event.target.value)}
                    className="w-full rounded-xl border border-brand-line px-3.5 py-3 text-sm outline-none focus:border-brand-red"
                  />
                </AdminFormField>
              </div>
              <div className="flex flex-col-reverse gap-2 border-t border-brand-line bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={loadSettings}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-bold text-slate-600 hover:border-brand-navy"
                >
                  <RotateCcw size={16} /> Sıfırla
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Ayarları kaydet
                </button>
              </div>
            </section>

            <aside className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm xl:sticky xl:top-6">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-red">Canlı önizleme</p>
              <h2 className="mt-1 font-black text-brand-navy">İletişim kartı</h2>
              <div className="mt-5 overflow-hidden rounded-2xl bg-brand-navy p-5 text-white">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-red font-black">R</span>
                <h3 className="mt-5 text-lg font-black">{form.siteName || "Reha Spor"}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">Profesyonel spor zemini ve ekipman çözümleri.</p>
                <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-xs">
                  <p className="flex gap-2">
                    <Phone size={14} className="shrink-0 text-red-400" />
                    {form.phone}
                  </p>
                  <p className="flex gap-2">
                    <Mail size={14} className="shrink-0 text-red-400" />
                    {form.email}
                  </p>
                  <p className="flex gap-2">
                    <MapPin size={14} className="shrink-0 text-red-400" />
                    {form.address}
                  </p>
                  <p className="flex gap-2">
                    <Clock3 size={14} className="shrink-0 text-red-400" />
                    {form.workingHours}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Formdaki değişiklikler veritabanına kaydedilir ve doğrudan canlı sitede görünür.</p>
            </aside>
          </form>
        )}
      </main>
      {toast ? <AdminToast message={toast} onClose={() => setToast("")} /> : null}
    </>
  );
}
