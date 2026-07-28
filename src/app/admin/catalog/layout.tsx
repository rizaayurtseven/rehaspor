import type { ReactNode } from "react";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";

export default function AdminCatalogLayout({ children }: { children: ReactNode }) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
