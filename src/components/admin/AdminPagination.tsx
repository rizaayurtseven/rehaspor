"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type AdminPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-brand-line bg-white px-5 py-3.5 sm:flex-row">
      <p className="text-xs text-slate-500">
        Toplam <strong className="font-bold text-brand-navy">{totalItems}</strong> kayıttan{" "}
        <strong className="font-bold text-brand-navy">{startItem} - {endItem}</strong> arası gösteriliyor
      </p>

      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line bg-white text-slate-600 transition hover:border-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Önceki sayfa"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`grid h-8 min-w-8 place-items-center rounded-lg px-2 text-xs font-black transition ${
              currentPage === page
                ? "bg-brand-navy text-white"
                : "border border-brand-line bg-white text-slate-600 hover:border-brand-navy"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="grid h-8 w-8 place-items-center rounded-lg border border-brand-line bg-white text-slate-600 transition hover:border-brand-navy disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Sonraki sayfa"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
