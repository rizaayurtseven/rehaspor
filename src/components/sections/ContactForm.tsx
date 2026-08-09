"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ContactFormValues } from "@/types/contact";

type ContactFormProps = {
  initialSubject?: string;
};

const emptyForm: ContactFormValues & { website?: string } = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "", // Honeypot field
};

export function ContactForm({ initialSubject = "" }: ContactFormProps) {
  const [form, setForm] = useState({ ...emptyForm, subject: initialSubject });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setSubmitted(false);
    setErrorMessage(null);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Anti-spam honeypot check
    if (form.website) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          website: form.website,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error?.message || "Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
      }

      setSubmitted(true);
      setForm({ ...emptyForm });
    } catch (err: any) {
      setErrorMessage(err.message || "İletişim sunucusuna ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-brand-line bg-white p-6 shadow-card sm:p-8">
      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => updateField("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Ad soyad
          <Input
            name="fullName"
            autoComplete="name"
            placeholder="Adınız ve soyadınız"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            required
            disabled={loading}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          E-posta
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@firma.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            disabled={loading}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Telefon
          <Input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+90 5xx xxx xx xx"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
            disabled={loading}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-brand-navy">
          Konu
          <Input
            name="subject"
            placeholder="Proje veya ürün konusu"
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            required
            disabled={loading}
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-bold text-brand-navy">
        Mesaj
        <Textarea
          name="message"
          placeholder="Alan, ölçü, kullanım amacı ve ihtiyacınız hakkında kısa bilgi paylaşın."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          rows={6}
          disabled={loading}
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">Talebiniz kaydedildikten sonra ekibimiz en kısa sürede dönüş yapacaktır.</p>
        <Button type="submit" disabled={loading} className="w-full shrink-0 sm:w-auto">
          {loading ? (
            <>
              Gönderiliyor <Loader2 size={17} className="ml-2 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Mesaj Gönder <Send size={17} className="ml-2" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite">
        {submitted ? (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={19} aria-hidden="true" /> Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        ) : null}

        {errorMessage ? (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-rose-50 p-4 text-sm font-semibold text-rose-700">
            <AlertCircle size={19} aria-hidden="true" /> {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
