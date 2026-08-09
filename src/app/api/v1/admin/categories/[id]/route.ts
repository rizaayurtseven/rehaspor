import { updateCategorySchema } from "@/contracts/category";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { deleteAdminCategory, getAdminCategoryById, updateAdminCategory } from "@/server/modules/categories/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const { id } = await context.params;
    const category = await getAdminCategoryById(id);
    return apiSuccess({ category }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    const body: unknown = await request.json();
    const input = updateCategorySchema.parse(body);
    const category = await updateAdminCategory(id, input, admin.id, requestId);
    return apiSuccess({ category }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    await deleteAdminCategory(id, admin.id, requestId);
    return apiSuccess({ success: true }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
