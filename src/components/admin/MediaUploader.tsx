"use client";

import { CheckCircle2, FileText, FileUp, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useId, useState, type ChangeEvent, type DragEvent } from "react";

type MediaUploaderProps = {
  value?: string;
  onChange: (url: string, assetId?: string) => void;
  label?: string;
  helper?: string;
  accept?: string;
  isPdf?: boolean;
};

export function MediaUploader({
  value,
  onChange,
  label = "Görsel yükleyin",
  helper = "PNG, JPG veya WebP · maks. 10 MB",
  accept = "image/png,image/jpeg,image/webp",
  isPdf = false,
}: MediaUploaderProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function uploadFile(file: File) {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      // Step 1: Request presigned upload or direct upload URL
      const presignRes = await fetch("/api/v1/admin/media/presign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          originalName: file.name,
          mimeType: file.type || (isPdf ? "application/pdf" : "image/jpeg"),
          size: file.size,
        }),
      });

      const presignData = await presignRes.json();

      if (!presignRes.ok) {
        throw new Error(presignData.error?.message || "Yükleme başlatılamadı.");
      }

      const { uploadUrl, assetId, publicUrl, headers } = presignData.data.presign;

      // Step 2: Upload file binary or multipart to uploadUrl
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        headers: headers || { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Dosya sunucuya aktarılamadı.");
      }

      // Step 3: Mark complete
      await fetch("/api/v1/admin/media/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ assetId }),
      }).catch(() => undefined);

      onChange(publicUrl, assetId);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Dosya yüklenirken bir hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }

  function handleRemove() {
    onChange("");
    setErrorMessage(null);
  }

  return (
    <div className="grid gap-2">
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-brand-line bg-slate-50 p-4">
          <div className="flex items-center gap-4">
            {isPdf ? (
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-red-100 text-brand-red">
                <FileText size={32} />
              </div>
            ) : (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-brand-line bg-white">
                <Image src={value} alt="Yüklenen Görsel" fill className="object-cover" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={14} /> Dosya Yüklendi
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-700">{value}</p>
              <div className="mt-2 flex items-center gap-2">
                <label
                  htmlFor={inputId}
                  className="cursor-pointer text-xs font-bold text-brand-navy hover:text-brand-red"
                >
                  Değiştir
                </label>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800"
                >
                  Kaldır
                </button>
              </div>
            </div>
          </div>
          <input id={inputId} type="file" accept={accept} className="sr-only" onChange={handleFileChange} />
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed p-6 text-center transition ${
            isDragging
              ? "border-brand-red bg-red-50/40"
              : "border-slate-300 bg-slate-50 hover:border-brand-red/60 hover:bg-red-50/10"
          }`}
        >
          <input
            id={inputId}
            type="file"
            accept={accept}
            className="sr-only"
            disabled={isUploading}
            onChange={handleFileChange}
          />
          {isUploading ? (
            <div className="py-2">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-red" />
              <p className="mt-3 text-xs font-bold text-brand-navy">Dosya sunucuya yükleniyor...</p>
            </div>
          ) : (
            <>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-red shadow-sm">
                <UploadCloud size={24} />
              </span>
              <p className="mt-3 text-sm font-black text-brand-navy">{label}</p>
              <p className="mt-1 text-xs text-slate-500">{helper}</p>
              <label
                htmlFor={inputId}
                className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-brand-navy shadow-sm border border-brand-line transition hover:border-brand-red hover:text-brand-red"
              >
                <FileUp size={15} />
                Dosya Seç
              </label>
            </>
          )}
        </div>
      )}

      {errorMessage ? (
        <p className="text-xs font-semibold text-rose-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
