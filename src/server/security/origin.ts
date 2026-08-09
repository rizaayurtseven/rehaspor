import "server-only";
import { getAuthEnv } from "@/server/config/env";
import { AppError } from "@/server/http/errors";

export function verifyOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Standard browser same-origin POST/PATCH/DELETE requests send origin header.
    // If no origin is provided, check referer header.
    const referer = request.headers.get("referer");
    if (!referer) return; // Non-browser client or missing origin header
  }

  const { APP_ORIGIN, NODE_ENV } = getAuthEnv();

  if (!APP_ORIGIN) {
    // If APP_ORIGIN is not configured in development, allow request
    if (NODE_ENV !== "production") return;
    throw new AppError("Uygulama origin yapılandırması eksik.", {
      code: "ORIGIN_MISMATCH",
      status: 403,
    });
  }

  const targetOrigin = origin || (request.headers.get("referer") ? new URL(request.headers.get("referer")!).origin : null);

  if (targetOrigin && targetOrigin !== APP_ORIGIN) {
    throw new AppError("Geçersiz istek origin'i.", {
      code: "ORIGIN_MISMATCH",
      status: 403,
    });
  }
}
