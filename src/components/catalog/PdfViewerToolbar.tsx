"use client";

import { Download, ExternalLink, Maximize2, Menu, Minus, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Plus, Search } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";

type FitMode = "width" | "page" | "custom";

type PdfViewerToolbarProps = {
  currentPage: number;
  file: string;
  fitMode: FitMode;
  numPages: number;
  onFitPage: () => void;
  onFitWidth: () => void;
  onPageInputChange: (value: string) => void;
  onPageInputCommit: () => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onToggleThumbnails: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  pageInput: string;
  searchQuery: string;
  searchStatus: string;
  searching: boolean;
  setSearchQuery: (value: string) => void;
  thumbnailsOpen: boolean;
  zoom: number;
};

const iconButton = "grid h-11 w-11 shrink-0 place-items-center rounded border border-brand-line bg-white text-brand-navy transition hover:border-brand-red hover:text-brand-red disabled:cursor-not-allowed disabled:opacity-40";

export function PdfViewerToolbar({
  currentPage, file, fitMode, numPages, onFitPage, onFitWidth, onPageInputChange, onPageInputCommit,
  onSearch, onToggleThumbnails, onZoomIn, onZoomOut, pageInput, searchQuery, searchStatus, searching,
  setSearchQuery, thumbnailsOpen, zoom,
}: PdfViewerToolbarProps) {
  function handlePageKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onPageInputCommit();
    }
  }

  const fitControls = (
    <>
      <button type="button" onClick={onFitPage} className={`${iconButton} ${fitMode === "page" ? "border-brand-red text-brand-red" : ""}`} aria-label="Sayfaya sığdır" title="Sayfaya sığdır">
        <Maximize2 size={17} aria-hidden="true" />
      </button>
      <button type="button" onClick={onFitWidth} className={`${iconButton} ${fitMode === "width" ? "border-brand-red text-brand-red" : ""}`} aria-label="Genişliğe sığdır" title="Genişliğe sığdır">
        <Menu className="rotate-90" size={18} aria-hidden="true" />
      </button>
    </>
  );

  const zoomControls = (
    <div className="flex items-center gap-1 rounded border border-brand-line bg-brand-soft p-0.5">
      <button type="button" onClick={onZoomOut} className="grid h-11 w-11 place-items-center rounded text-brand-navy hover:bg-white" aria-label="Uzaklaştır"><Minus size={16} aria-hidden="true" /></button>
      <output className="min-w-10 text-center text-xs font-black tabular-nums text-brand-navy" aria-label={`Yakınlaştırma yüzde ${Math.round(zoom * 100)}`}>%{Math.round(zoom * 100)}</output>
      <button type="button" onClick={onZoomIn} className="grid h-11 w-11 place-items-center rounded text-brand-navy hover:bg-white" aria-label="Yakınlaştır"><Plus size={16} aria-hidden="true" /></button>
    </div>
  );

  return (
    <div className="relative z-30 w-full min-w-0 max-w-full border-b border-brand-line bg-white/95 px-2 py-2 backdrop-blur sm:px-3">
      <div className="flex w-full min-w-0 max-w-full items-center gap-1.5">
        <button type="button" onClick={onToggleThumbnails} className={iconButton} aria-label={thumbnailsOpen ? "Sayfa önizlemelerini kapat" : "Sayfa önizlemelerini aç"} aria-pressed={thumbnailsOpen} title="Sayfa önizlemeleri">
          {thumbnailsOpen ? <PanelLeftClose size={18} aria-hidden="true" /> : <PanelLeftOpen size={18} aria-hidden="true" />}
        </button>

        <div className="ml-0.5 hidden sm:block">{zoomControls}</div>

        <div className="hidden items-center gap-1.5 md:flex">{fitControls}</div>

        <div className="ml-auto flex items-center gap-1.5">
          <label className="flex h-11 items-center gap-1.5 rounded border border-brand-line bg-white px-2 text-sm font-bold text-brand-navy">
            <span className="sr-only">Sayfa numarası</span>
            <input type="number" min={1} max={Math.max(numPages, 1)} value={pageInput} onChange={(event) => onPageInputChange(event.target.value)} onBlur={onPageInputCommit} onKeyDown={handlePageKeyDown} className="h-9 w-12 rounded border border-brand-line bg-white px-1.5 text-center text-base font-black tabular-nums text-brand-navy outline-none focus:border-brand-red" aria-label="Sayfa numarası" />
            <span className="whitespace-nowrap text-xs text-brand-muted">/ {numPages || "—"}</span>
          </label>

          <form onSubmit={onSearch} className="relative hidden items-center xl:flex">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
            <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Katalogda ara" className="h-11 w-44 rounded-l border border-r-0 border-brand-line bg-white pl-9 pr-3 text-sm text-brand-ink outline-none transition focus:w-52 focus:border-brand-red" aria-label="Katalogda ara" />
            <button type="submit" disabled={searching} className="h-11 rounded-r border border-brand-red bg-brand-red px-3 text-xs font-black text-white transition hover:bg-red-700 disabled:opacity-50">
              {searching ? "Aranıyor" : "Ara"}
            </button>
            <span className="sr-only" aria-live="polite">{searchStatus}</span>
          </form>

          <a href={file} download className={`${iconButton} hidden lg:grid`} aria-label="PDF indir" title="PDF indir"><Download size={17} aria-hidden="true" /></a>
          <a href={file} target="_blank" rel="noreferrer" className={`${iconButton} hidden lg:grid`} aria-label="PDF'yi yeni sekmede aç" title="Yeni sekmede aç"><ExternalLink size={17} aria-hidden="true" /></a>

          <details className="group relative md:hidden">
            <summary className={`${iconButton} cursor-pointer list-none`} aria-label="Diğer PDF araçları"><MoreHorizontal size={19} aria-hidden="true" /></summary>
            <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-72 max-w-[calc(100vw-2rem)] rounded border border-brand-line bg-white p-3 shadow-lift">
              <p className="label-caps text-brand-muted">Görünüm</p>
              <div className="mt-2 flex gap-2">{fitControls}</div>
              <div className="mt-3 sm:hidden">{zoomControls}</div>
              <form onSubmit={onSearch} className="mt-4">
                <label className="text-xs font-bold text-brand-navy" htmlFor="mobile-pdf-search">Katalogda ara</label>
                <div className="mt-1.5 flex gap-2">
                  <input id="mobile-pdf-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="h-11 min-w-0 flex-1 rounded border border-brand-line px-3 text-sm outline-none focus:border-brand-red" />
                  <button type="submit" disabled={searching} className="grid h-11 w-11 shrink-0 place-items-center rounded bg-brand-red text-white disabled:opacity-50" aria-label="Ara"><Search size={17} aria-hidden="true" /></button>
                </div>
                {searchStatus ? <p className="mt-2 text-xs leading-5 text-brand-muted" aria-live="polite">{searchStatus}</p> : null}
              </form>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-brand-line pt-3">
                <a href={file} download className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-brand-line text-xs font-bold text-brand-navy"><Download size={15} /> İndir</a>
                <a href={file} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-brand-line text-xs font-bold text-brand-navy"><ExternalLink size={15} /> Yeni sekme</a>
              </div>
            </div>
          </details>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">Sayfa {currentPage} gösteriliyor. {searching ? "Arama yapılıyor." : searchStatus}</span>
    </div>
  );
}

export type { FitMode };
