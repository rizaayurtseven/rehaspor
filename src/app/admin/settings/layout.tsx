import type { ReactNode } from "react";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";

export default function AdminSettingsLayout({ children }: { children: ReactNode }) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
