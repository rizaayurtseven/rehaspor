import { CheckCircle2, X } from "lucide-react";

type AdminToastProps = {
  message: string;
  onClose: () => void;
};

export function AdminToast({ message, onClose }: AdminToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white shadow-2xl" role="status">
      <CheckCircle2 size={19} className="shrink-0 text-emerald-400" />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Bildirimi kapat">
        <X size={16} />
      </button>
    </div>
  );
}
