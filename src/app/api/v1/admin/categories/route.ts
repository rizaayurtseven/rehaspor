import { createCategorySchema } from "@/contracts/category";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { createAdminCategory, getAdminCategories } from "@/server/modules/categories/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const categories = await getAdminCategories();
    return apiSuccess({ categories }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const body: unknown = await request.json();
    const input = createCategorySchema.parse(body);
    const category = await createAdminCategory(input, admin.id, requestId);
    return apiSuccess({ category }, requestId, { status: 201 });
  } catch (error) {
    return apiError(error, requestId);
  }
}
