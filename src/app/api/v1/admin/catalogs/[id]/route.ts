import { updateCatalogSchema } from "@/contracts/catalog";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { updateAdminCatalog } from "@/server/modules/catalogs/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    const body: unknown = await request.json();
    const input = updateCatalogSchema.parse(body);
    const catalog = await updateAdminCatalog(id, input, admin.id, requestId);
    return apiSuccess({ catalog }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
