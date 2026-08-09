import { requireAdminApi } from "@/server/auth/admin-guard";
import { getAdminMessages } from "@/server/modules/messages/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const messages = await getAdminMessages();
    return apiSuccess({ messages }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
