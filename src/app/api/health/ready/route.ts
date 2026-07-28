import type { ReadinessStatus } from "@/contracts/api";
import { checkDatabaseConnection } from "@/server/db/health";
import { ServiceUnavailableError } from "@/server/http/errors";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const { latencyMs } = await checkDatabaseConnection();
    const health: ReadinessStatus = {
      status: "ok",
      service: "reha-spor",
      timestamp: new Date().toISOString(),
      database: "connected",
      latencyMs,
    };

    return apiSuccess(health, requestId, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    console.error("Database readiness check failed.", {
      requestId,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return apiError(
      new ServiceUnavailableError("Veritabanı bağlantısı hazır değil.", error),
      requestId,
    );
  }
}
