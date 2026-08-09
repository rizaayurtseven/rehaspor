import { createCatalogSchema } from "@/contracts/catalog";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { createAdminCatalog, getAdminCatalogs } from "@/server/modules/catalogs/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const catalogs = await getAdminCatalogs();
    return apiSuccess({ catalogs }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = createCatalogSchema.parse(body);
    const catalog = await createAdminCatalog(input, admin.id, requestId);
    return apiSuccess({ catalog }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
