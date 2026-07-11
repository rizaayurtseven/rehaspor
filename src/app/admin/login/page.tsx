"use client";

import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => router.push("/admin/dashboard"), 350);
  }

  return (
    <main className="min-h-screen bg-brand-soft lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)]">
      <section className="relative hidden overflow-hidden bg-brand-navy p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border-[80px] border-white/[0.03]" />
        <div className="absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full bg-brand-red/10 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red text-lg font-black shadow-xl shadow-red-950/30">R</span>
          <span>
            <span className="block text-sm font-black tracking-wide">REHA SPOR</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Yönetim merkezi</span>
          </span>
        </Link>

        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-slate-300">
            <ShieldCheck size={15} className="text-red-400" />
            Frontend demo paneli
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight xl:text-5xl">
            Kataloğunuzu tek bir merkezden yönetin.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
            Ürünleri, kategorileri, referans projeleri ve müşteri taleplerini düzenli bir yönetim deneyimiyle takip edin.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["Ürün yönetimi", "Mesaj takibi", "Katalog kontrolü"].map((item, index) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <span className="text-xs font-black text-red-400">0{index + 1}</span>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">© 2026 Reha Spor · Demo yönetim arayüzü</p>
      </section>

      <section className="flex min-h-screen items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center justify-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-red font-black text-white">R</span>
            <span className="font-black tracking-wide text-brand-navy">REHA SPOR</span>
          </Link>

          <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-card sm:p-9">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">Yönetim paneli</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-navy">Tekrar hoş geldiniz</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Devam etmek için demo yönetici bilgilerinizi girin.</p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2" htmlFor="admin-email">
                <span className="text-sm font-bold text-brand-navy">E-posta adresi</span>
                <span className="relative">
                  <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    defaultValue="admin@rehaspor.com"
                    className="w-full rounded-xl border border-brand-line bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
                  />
                </span>
              </label>

              <label className="grid gap-2" htmlFor="admin-password">
                <span className="text-sm font-bold text-brand-navy">Şifre</span>
                <span className="relative">
                  <LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={4}
                    autoComplete="current-password"
                    defaultValue="demo1234"
                    className="w-full rounded-xl border border-brand-line bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-red-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-brand-navy"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between gap-4 text-xs">
                <label className="flex items-center gap-2 font-semibold text-slate-600">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-red" />
                  Beni hatırla
                </label>
                <span className="font-semibold text-slate-400">Demo erişimi</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Yönlendiriliyor..." : "Giriş yap"}
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Bu ekran gerçek kimlik doğrulaması içermez; backend entegrasyonuna hazır bir frontend demosudur.
          </p>
        </div>
      </section>
    </main>
  );
}
