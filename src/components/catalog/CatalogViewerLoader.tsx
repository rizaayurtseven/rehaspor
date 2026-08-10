"use client";

import dynamic from "next/dynamic";

const CatalogPdfViewer = dynamic(
  () => import("@/components/catalog/CatalogPdfViewer").then((module) => module.CatalogPdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[38rem] place-items-center bg-[#f5f5f5] px-6 text-center" aria-busy="true">
        <div>
          <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-brand-line border-t-brand-red" />
          <p className="mt-4 text-sm font-semibold text-brand-muted">Katalog görüntüleyici hazırlanıyor…</p>
        </div>
      </div>
    ),
  },
);

export function CatalogViewerLoader({ file, title }: { file: string; title: string }) {
  return <CatalogPdfViewer file={file} title={title} />;
}
