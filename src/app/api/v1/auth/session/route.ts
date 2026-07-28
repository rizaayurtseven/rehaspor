import { getCurrentSession } from "@/server/auth/session";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const session = await getCurrentSession();
    if (!session) {
      return apiSuccess({ authenticated: false }, requestId, {
        headers: { "cache-control": "no-store" },
      });
    }

    return apiSuccess(
      { authenticated: true, user: session.user },
      requestId,
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    return apiError(error, requestId);
  }
}
