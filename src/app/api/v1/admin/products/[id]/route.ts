import { updateProductSchema } from "@/contracts/product";
import { requireAdminApi } from "@/server/auth/admin-guard";
import { deleteAdminProduct, getAdminProductById, updateAdminProduct } from "@/server/modules/products/service";
import { getRequestId } from "@/server/http/request";
import { apiError, apiSuccess } from "@/server/http/response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    await requireAdminApi(request);
    const { id } = await context.params;
    const product = await getAdminProductById(id);
    return apiSuccess({ product }, requestId);
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
    const input = updateProductSchema.parse(body);
    const product = await updateAdminProduct(id, input, admin.id, requestId);
    return apiSuccess({ product }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request);
  try {
    const admin = await requireAdminApi(request);
    const { id } = await context.params;
    await deleteAdminProduct(id, admin.id, requestId);
    return apiSuccess({ success: true }, requestId);
  } catch (error) {
    return apiError(error, requestId);
  }
}
