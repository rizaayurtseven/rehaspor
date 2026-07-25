import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getCurrentSession } from "@/server/auth/session";

export async function AdminRouteGuard({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/admin/login");
  }

  return children;
}
