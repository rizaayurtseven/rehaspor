"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Boxes,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Tags,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  { href: "/admin/dashboard", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Kategoriler", icon: Tags },
  { href: "/admin/products", label: "Ürünler", icon: Boxes },
  { href: "/admin/references", label: "Referanslar", icon: FolderKanban },
  { href: "/admin/catalog", label: "E-Katalog", icon: BookOpen },
  { href: "/admin/messages", label: "Mesajlar", icon: Mail },
  { href: "/admin/settings", label: "Site Ayarları", icon: Settings }
];

type AdminSidebarProps = {
  mobile?: boolean;
  onClose?: () => void;
};

export function AdminSidebar({ mobile = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-[min(88vw,320px)] flex-col bg-brand-ink text-white shadow-2xl"
          : "sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-brand-ink text-white lg:flex"
      }
    >
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-8">
        <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <span className="grid h-10 w-10 place-items-center rounded bg-brand-red text-sm font-black text-white">
            RS
          </span>
          <span>
            <span className="block text-lg font-black">REHA SPOR</span>
            <span className="label-caps block text-[10px] text-slate-500">Management</span>
          </span>
        </Link>
        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Menüyü kapat"
          >
            <X size={20} />
          </button>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <p className="label-caps px-8 pb-4 text-slate-500">Yönetim</p>
        <nav className="grid gap-1" aria-label="Admin navigasyonu">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={
                  isActive
                    ? "relative flex items-center gap-3 bg-brand-red/10 px-8 py-3 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-brand-red"
                    : "flex items-center gap-3 px-8 py-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                }
              >
                <Icon size={19} className={isActive ? "text-brand-red" : "text-slate-500"} />
                <span className="flex-1 text-sm font-semibold">{item.label}</span>
                {isActive ? <ChevronRight size={15} className="text-slate-500" /> : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-brand-red text-xs font-black text-white">A</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold">Demo Yönetici</span>
            <span className="block truncate text-xs text-slate-500">admin@rehaspor.com</span>
          </span>
        </div>
        <Link
          href="/admin/login"
          onClick={onClose}
          className="label-caps flex items-center justify-center gap-2 border border-white/10 px-4 py-3 text-slate-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={15} />
          Çıkış
        </Link>
      </div>
    </aside>
  );
}
