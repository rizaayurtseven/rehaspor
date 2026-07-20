"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ContactFormValues } from "@/types/contact";

type ContactFormProps = {
  initialSubject?: string;
};

const emptyForm: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

export function ContactForm({ initialSubject = "" }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>({ ...emptyForm, subject: initialSubject });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ ...emptyForm });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[8px] border border-brand-line bg-white p-6 shadow-card sm:p-8">
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
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">Form, backend bağlantısı geldiğinde gerçek gönderim servisine bağlanacaktır.</p>
        <Button type="submit" className="w-full shrink-0 sm:w-auto">
          Mesaj Gönder <Send size={17} className="ml-2" aria-hidden="true" />
        </Button>
      </div>

      <div aria-live="polite">
        {submitted ? (
          <p className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={19} aria-hidden="true" /> Mesajınız başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        ) : null}
      </div>
    </form>
  );
}
