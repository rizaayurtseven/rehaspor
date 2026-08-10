"use client";

import { Thumbnail } from "react-pdf";
import { List, type RowComponentProps } from "react-window";

type ThumbnailRowProps = { currentPage: number; onSelectPage: (page: number) => void };

function ThumbnailRow({ index, style, currentPage, onSelectPage }: RowComponentProps<ThumbnailRowProps>) {
  const pageNumber = index + 1;
  const active = pageNumber === currentPage;

  return (
    <div style={style} className="flex justify-center px-3 py-2">
      <div className={`group relative flex h-full w-full flex-col items-center justify-center rounded border p-2 transition ${active ? "border-brand-red bg-red-50" : "border-transparent hover:border-brand-line hover:bg-white"}`}>
        <span className="pointer-events-none overflow-hidden bg-white shadow-sm" aria-hidden="true"><Thumbnail pageNumber={pageNumber} width={104} /></span>
        <span className={`mt-1.5 text-xs font-black tabular-nums ${active ? "text-brand-red" : "text-brand-muted"}`}>{pageNumber}</span>
        <button type="button" onClick={() => onSelectPage(pageNumber)} className="absolute inset-0 rounded focus-visible:outline-brand-red" aria-label={`${pageNumber}. sayfaya git`} aria-current={active ? "page" : undefined} />
      </div>
    </div>
  );
}

export function PdfThumbnailRail({ currentPage, height, numPages, onSelectPage }: { currentPage: number; height: number; numPages: number; onSelectPage: (page: number) => void }) {
  return (
    <aside className="absolute inset-y-0 left-0 z-20 w-40 border-r border-brand-line bg-brand-soft/95 backdrop-blur md:relative md:inset-auto md:z-auto md:w-44 md:shrink-0" aria-label="Sayfa önizlemeleri">
      <List rowComponent={ThumbnailRow} rowCount={numPages} rowHeight={164} rowProps={{ currentPage, onSelectPage }} overscanCount={2} style={{ height, width: "100%" }} />
    </aside>
  );
}
