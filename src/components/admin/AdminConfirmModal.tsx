"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type AdminConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  tone?: "danger" | "warning" | "primary";
};

export function AdminConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Sil",
  cancelText = "İptal",
  isLoading = false,
  tone = "danger",
}: AdminConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const toneButtonClass =
    tone === "danger"
      ? "bg-brand-red text-white hover:bg-red-700"
      : tone === "warning"
      ? "bg-amber-600 text-white hover:bg-amber-700"
      : "bg-brand-navy text-white hover:bg-slate-800";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
        <button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Kapat"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
              tone === "danger"
                ? "bg-red-50 text-brand-red"
                : tone === "warning"
                ? "bg-amber-50 text-amber-600"
                : "bg-blue-50 text-brand-navy"
            }`}
          >
            <AlertTriangle size={24} />
          </span>

          <div className="flex-1">
            <h3 className="text-lg font-black text-brand-navy">{title}</h3>
            <div className="mt-2 text-sm leading-6 text-slate-600">{description}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="rounded-xl border border-brand-line bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition disabled:opacity-50 ${toneButtonClass}`}
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
