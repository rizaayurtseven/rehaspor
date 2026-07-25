import type { HealthStatus } from "@/contracts/api";
import { getRequestId } from "@/server/http/request";
import { apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestId = getRequestId(request);
  const health: HealthStatus = {
    status: "ok",
    service: "reha-spor",
    timestamp: new Date().toISOString(),
  };

  return apiSuccess(health, requestId, {
    headers: { "cache-control": "no-store" },
  });
}
