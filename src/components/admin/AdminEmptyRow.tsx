import { Inbox } from "lucide-react";

export function AdminEmptyRow({ colSpan, message = "Bu filtreyle eşleşen kayıt bulunamadı." }: { colSpan: number; message?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-12 text-center">
        <Inbox className="mx-auto text-slate-300" size={28} />
        <p className="mt-3 text-sm font-semibold text-slate-500">{message}</p>
      </td>
    </tr>
  );
}
