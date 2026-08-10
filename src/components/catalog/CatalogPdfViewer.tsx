"use client";

import { FileWarning } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { List, type ListImperativeAPI, type RowComponentProps } from "react-window";
import { PdfThumbnailRail } from "@/components/catalog/PdfThumbnailRail";
import { PdfViewerToolbar, type FitMode } from "@/components/catalog/PdfViewerToolbar";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const MIN_ZOOM = 0.45;
const MAX_ZOOM = 2.5;
const PAGE_GAP = 24;
const VIEWER_HEIGHT = 720;

type PageSize = { width: number; height: number };
type PageRowProps = { overflow: boolean; pageWidth: number; title: string };

function clampZoom(value: number) { return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)); }

function PdfPageRow({ index, style, overflow, pageWidth, title }: RowComponentProps<PageRowProps>) {
  const pageNumber = index + 1;
  return (
    <div style={style} className={`flex items-start px-3 py-3 sm:px-5 ${overflow ? "justify-start" : "justify-center"}`}>
      <article className="relative overflow-hidden bg-white shadow-[0_3px_16px_rgba(15,23,42,0.14)]" aria-label={`${title}, sayfa ${pageNumber}`}>
        <Page pageNumber={pageNumber} width={pageWidth} renderAnnotationLayer renderTextLayer loading={<div className="grid aspect-[0.707] w-full place-items-center bg-white text-xs font-semibold text-brand-muted">Sayfa {pageNumber} hazırlanıyor…</div>} />
      </article>
    </div>
  );
}

export function CatalogPdfViewer({ file, title }: { file: string; title: string }) {
  const paneRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListImperativeAPI>(null);
  const pendingPageRef = useRef<{ page: number; expiresAt: number } | null>(null);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageSize, setPageSize] = useState<PageSize>({ width: 595, height: 842 });
  const [paneSize, setPaneSize] = useState({ width: 900, height: VIEWER_HEIGHT });
  const [customZoom, setCustomZoom] = useState(1);
  const [fitMode, setFitMode] = useState<FitMode>("width");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [thumbnailsOpen, setThumbnailsOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searching, setSearching] = useState(false);

  const availableWidth = Math.max(280, paneSize.width - 40);
  const availableHeight = Math.max(360, paneSize.height - PAGE_GAP);
  const calculateFit = useCallback((mode: Exclude<FitMode, "custom">) => {
    const widthScale = availableWidth / pageSize.width;
    return clampZoom(mode === "width" ? widthScale : Math.min(widthScale, availableHeight / pageSize.height));
  }, [availableHeight, availableWidth, pageSize.height, pageSize.width]);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setPaneSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(pane);
    return () => observer.disconnect();
  }, [pdfDocument]);

  const zoom = fitMode === "custom" ? customZoom : calculateFit(fitMode);
  const pageWidth = Math.round(pageSize.width * zoom);
  const rowHeight = Math.round(pageSize.height * zoom + PAGE_GAP);
  const viewerHeight = Math.max(520, Math.min(VIEWER_HEIGHT, typeof window === "undefined" ? VIEWER_HEIGHT : window.innerHeight - 150));
  const pageRowProps = useMemo(() => ({ overflow: pageWidth > availableWidth, pageWidth, title }), [availableWidth, pageWidth, title]);

  const goToPage = useCallback((page: number, behavior: "auto" | "smooth" = "smooth") => {
    if (!numPages) return;
    const target = Math.min(numPages, Math.max(1, Math.trunc(page)));
    pendingPageRef.current = { page: target, expiresAt: Date.now() + 1500 };
    setCurrentPage(target);
    setPageInput(String(target));
    listRef.current?.scrollToRow({ index: target - 1, align: "start", behavior });
  }, [numPages]);

  const handleDocumentLoad = useCallback(async (document: PDFDocumentProxy) => {
    setPdfDocument(document);
    setNumPages(document.numPages);
    const firstPage = await document.getPage(1);
    const viewport = firstPage.getViewport({ scale: 1 });
    setPageSize({ width: viewport.width, height: viewport.height });
    setCurrentPage(1);
    setPageInput("1");
  }, []);

  const handleDocumentItemClick = useCallback(({ pageNumber }: { pageNumber: number }) => {
    goToPage(pageNumber);
  }, [goToPage]);

  const handleVisibleRows = useCallback(({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
    const pending = pendingPageRef.current;
    const page = pending && pending.expiresAt > Date.now() ? pending.page : startIndex + 1;
    if (pending && pending.expiresAt <= Date.now()) pendingPageRef.current = null;
    setCurrentPage(page);
    setPageInput(String(page));
  }, []);

  function changeZoom(delta: number) {
    setCustomZoom(clampZoom(zoom + delta));
    setFitMode("custom");
  }

  function commitPageInput() {
    const requestedPage = Number(pageInput);
    if (Number.isFinite(requestedPage)) goToPage(requestedPage);
    else setPageInput(String(currentPage));
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim().toLocaleLowerCase("tr-TR");
    if (!query || !pdfDocument || searching) return;
    setSearching(true);
    setSearchStatus("Aranıyor…");
    try {
      for (let offset = 0; offset < numPages; offset += 1) {
        const pageNumber = ((currentPage + offset) % numPages) + 1;
        const page = await pdfDocument.getPage(pageNumber);
        const content = await page.getTextContent();
        const text = content.items.map((item) => ("str" in item ? item.str : "")).join(" ").toLocaleLowerCase("tr-TR");
        if (text.includes(query)) {
          goToPage(pageNumber);
          setSearchStatus(`Eşleşme ${pageNumber}. sayfada bulundu.`);
          return;
        }
      }
      setSearchStatus("Bu ifadeyle eşleşen metin bulunamadı.");
    } catch {
      setSearchStatus("Metin katmanı okunamadı. Katalog için OCR gerekebilir.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded border border-brand-line bg-white shadow-brand">
      <Document className="w-full min-w-0 max-w-full" file={file} onLoadSuccess={handleDocumentLoad} onItemClick={handleDocumentItemClick}
        loading={<div className="grid min-h-[38rem] place-items-center bg-[#f5f5f5] px-6 text-center" aria-busy="true"><div><span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-brand-line border-t-brand-red" /><p className="mt-4 text-sm font-semibold text-brand-muted">PDF sayfaları hazırlanıyor…</p></div></div>}
        error={<div className="grid min-h-[38rem] place-items-center bg-[#f5f5f5] p-6 text-center" role="alert"><div className="max-w-md"><FileWarning className="mx-auto text-brand-red" size={36} aria-hidden="true" /><h3 className="mt-4 text-xl font-black text-brand-navy">Katalog yüklenemedi</h3><p className="mt-2 text-sm leading-6 text-brand-muted">PDF dosyasını yeni sekmede açmayı veya indirmeyi deneyin.</p><a href={file} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center rounded bg-brand-red px-5 py-2 text-sm font-bold text-white">PDF’yi aç</a></div></div>}
      >
        <PdfViewerToolbar currentPage={currentPage} file={file} fitMode={fitMode} numPages={numPages} onFitPage={() => setFitMode("page")} onFitWidth={() => setFitMode("width")} onPageInputChange={setPageInput} onPageInputCommit={commitPageInput} onSearch={handleSearch} onToggleThumbnails={() => setThumbnailsOpen((open) => !open)} onZoomIn={() => changeZoom(0.1)} onZoomOut={() => changeZoom(-0.1)} pageInput={pageInput} searchQuery={searchQuery} searchStatus={searchStatus} searching={searching} setSearchQuery={setSearchQuery} thumbnailsOpen={thumbnailsOpen} zoom={zoom} />
        <div className="relative flex w-full min-w-0 max-w-full overflow-hidden bg-[#f5f5f5]" style={{ height: viewerHeight } as CSSProperties}>
          {thumbnailsOpen && numPages ? <PdfThumbnailRail currentPage={currentPage} height={viewerHeight} numPages={numPages} onSelectPage={goToPage} /> : null}
          <div ref={paneRef} className="min-w-0 max-w-full flex-1 touch-pan-x touch-pan-y overflow-hidden" style={{ touchAction: "pan-x pan-y pinch-zoom" }}>
            {numPages ? <List listRef={listRef} rowComponent={PdfPageRow} rowCount={numPages} rowHeight={rowHeight} rowProps={pageRowProps} overscanCount={2} onRowsRendered={handleVisibleRows} style={{ height: viewerHeight, width: "100%", overflowX: pageWidth > availableWidth ? "auto" : "hidden" }} /> : null}
          </div>
        </div>
      </Document>
    </div>
  );
}
