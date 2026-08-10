"use client";

import { CheckCircle2, FileUp, UploadCloud } from "lucide-react";
import { useId, useState, type ChangeEvent } from "react";

type ImageUploaderPlaceholderProps = {
  label?: string;
  helper?: string;
  accept?: string;
};

export function ImageUploaderPlaceholder({
  label = "Görsel yükleme alanı",
  helper = "PNG veya JPG · maksimum 5 MB",
  accept = "image/png,image/jpeg,image/webp",
}: ImageUploaderPlaceholderProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFileName(event.target.files?.[0]?.name ?? "");
  }

  return (
    <div className="rounded border border-dashed border-brand-steel/50 bg-brand-soft p-5 text-center transition hover:border-brand-red/60">
      <input id={inputId} type="file" accept={accept} className="sr-only" onChange={handleFileChange} />
      <span className="mx-auto grid h-11 w-11 place-items-center rounded bg-white text-brand-red shadow-sm">
        {fileName ? <CheckCircle2 size={21} /> : <UploadCloud size={21} />}
      </span>
      <p className="mt-3 text-sm font-black text-brand-navy">{fileName || label}</p>
      <p className="mt-1 text-xs text-brand-muted">{fileName ? "Dosya demo formuna eklendi." : helper}</p>
      <label
        htmlFor={inputId}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded border border-brand-line bg-white px-3.5 py-2 text-xs font-bold text-brand-navy transition hover:border-brand-red hover:text-brand-red"
      >
        <FileUp size={15} />
        {fileName ? "Dosyayı değiştir" : "Dosya seç"}
      </label>
    </div>
  );
}
